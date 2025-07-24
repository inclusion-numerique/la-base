import {
  DeploymentTargetOption,
  configureDeploymentTarget,
} from '@app/cli/deploymentTarget'
import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import { Command } from '@commander-js/extra-typings'

export const removeInactiveConseillersNumeriques = new Command(
  'domain:remove-inactive-conseillers-numeriques',
)
  .description('Remove inactive auto created accounts')
  .addOption(DeploymentTargetOption)
  .action(async (args) => {
    await configureDeploymentTarget(args)

    // Conseillers numeriques will be a member of this base
    const contributionBase = await prismaClient.base.findUnique({
      where: {
        slug: 'conseiller-numerique-contributions',
      },
      select: {
        id: true,
        slug: true,
      },
    })

    if (!contributionBase) {
      throw new Error('Contribution base not found')
    }

    output(
      `Found contribution base ${contributionBase.slug} (${contributionBase.id})`,
    )

    // Conseillers numeriques will follow this base
    const conseillersBase = await prismaClient.base.findUnique({
      where: {
        slug: 'conseiller-numerique',
      },
      select: {
        id: true,
        slug: true,
      },
    })

    if (!conseillersBase) {
      throw new Error('Conseillers base not found')
    }

    output(
      `Found conseillers base ${conseillersBase.slug} (${conseillersBase.id})`,
    )

    const conseillersNumeriques = await prismaClient.user.findMany({
      where: {
        email: {
          endsWith: '@conseiller-numerique.fr',
        },
        isPublic: false,
      },
      select: {
        id: true,
        email: true,
        slug: true,
        imageId: true,
        description: true,
        hasSeenV2Onboarding: true,
        website: true,
        twitter: true,
        department: true,
        linkedin: true,
        facebook: true,
        collections: {
          include: {
            resources: true,
          },
        },
        profileFollows: true,
        baseFollows: {
          where: {
            baseId: conseillersBase.id,
          },
          select: {
            id: true,
            baseId: true,
            followed: true,
            base: {
              select: {
                slug: true,
                id: true,
                title: true,
              },
            },
          },
        },
        ownedBases: true,
        bases: {
          where: {
            baseId: contributionBase.id,
          },
          select: {
            baseId: true,
            id: true,
            added: true,
            accepted: true,
          },
        },
        resourceEvent: true,
        resources: true,
        createdResources: true,
      },
    })

    output(`Id base conseillers numeriques : ${conseillersBase.id}`)
    output(`Found ${conseillersNumeriques.length} conseillers numériques`)

    const remaning = conseillersNumeriques.filter((conseiller) => {
      // Membre d'une autre base
      if (
        conseiller.bases.some(
          (base) =>
            base.baseId !== contributionBase.id &&
            base.baseId !== conseillersBase.id,
        )
      ) {
        return true
      }
      // Créé une base
      if (conseiller.ownedBases.length > 0) {
        return true
      }
      // Participé a une resource
      if (conseiller.resourceEvent.length > 0) {
        return true
      }
      if (
        conseiller.imageId ||
        conseiller.description ||
        conseiller.twitter ||
        conseiller.linkedin ||
        conseiller.facebook ||
        conseiller.website ||
        conseiller.hasSeenV2Onboarding ||
        conseiller.department
      ) {
        return true
      }
      if (conseiller.resources.length > 0) {
        return true
      }
      if (conseiller.createdResources.length > 0) {
        return true
      }

      if (conseiller.profileFollows.length > 0) {
        return true
      }

      if (
        conseiller.baseFollows.some(
          (base) => base.baseId !== conseillersBase.id,
        )
      ) {
        return true
      }

      if (
        conseiller.collections.some(
          (collection) =>
            (collection.isFavorites && collection.resources.length > 0) ||
            !collection.isFavorites,
        )
      ) {
        return true
      }
      return false
    })

    const deleted = conseillersNumeriques.filter(
      (conseiller) => !remaning.some((remain) => remain.id === conseiller.id),
    )

    output(`Found ${deleted.length} conseillers numériques to remove`)
    output(`Found ${remaning.length} conseillers numériques to keep`)

    for (const toDelete of deleted) {
      await prismaClient.collection.deleteMany({
        where: {
          createdById: toDelete.id,
        },
      })

      await prismaClient.baseFollow.deleteMany({
        where: {
          followerId: toDelete.id,
        },
      })

      await prismaClient.baseMembers.deleteMany({
        where: {
          memberId: toDelete.id,
        },
      })

      await prismaClient.user.delete({
        where: {
          id: toDelete.id,
        },
      })
    }

    output(`Deleted ${deleted.length} conseillers numériques to remove`)
  })
