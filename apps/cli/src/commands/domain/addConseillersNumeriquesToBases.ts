import {
  configureDeploymentTarget,
  DeploymentTargetOption,
} from '@app/cli/deploymentTarget'
import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import { Command } from '@commander-js/extra-typings'

export const addConseillersNumeriquesToBases = new Command(
  'domain:add-conseillers-numeriques-to-bases',
)
  .description(
    'Add conseillers numériques to contributions database and as followsers of the conseiller-numerique base',
  )
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
      },
      select: {
        id: true,
        email: true,
        slug: true,
        baseFollows: {
          where: {
            baseId: conseillersBase.id,
          },
          select: {
            id: true,
            baseId: true,
            followed: true,
          },
        },
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
      },
    })

    output(`Found ${conseillersNumeriques.length} conseillers numériques`)

    const timestamp = new Date()

    const conseillersWithoutFollow = conseillersNumeriques.filter(
      ({ baseFollows }) => baseFollows.length === 0,
    )

    // Creating follows
    const follows = await prismaClient.baseFollow.createMany({
      data: conseillersWithoutFollow.map(({ id }) => ({
        followerId: id,
        baseId: conseillersBase.id,
        followed: timestamp,
      })),
    })

    output(`Created ${follows.count} follows`)

    // Creating members
    const members = await prismaClient.baseMembers.createMany({
      data: conseillersNumeriques
        .filter(({ bases }) => bases.length === 0)
        .map(({ id }) => ({
          memberId: id,
          baseId: contributionBase.id,
          added: timestamp,
          accepted: timestamp,
          isAdmin: false,
        })),
    })

    output(`Created ${members.count} members`)

    // Mark members as accepted if they are not already
    const accepted = await prismaClient.baseMembers.updateMany({
      where: {
        baseId: contributionBase.id,
        memberId: {
          in: conseillersNumeriques
            .filter(({ bases }) => bases.length > 0 && !bases[0]?.accepted)
            .map(({ id }) => id),
        },
        accepted: null,
      },
      data: {
        accepted: timestamp,
      },
    })

    output(`Accepted ${accepted.count} pending members`)
  })
