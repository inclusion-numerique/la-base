import {
  configureDeploymentTarget,
  DeploymentTargetOption,
} from '@app/cli/deploymentTarget'
import { output } from '@app/cli/output'
import {
  getTrustedBaseIds,
  getTrustSignals,
} from '@app/web/features/indexation/db/getTrustedIds'
import {
  isGouvFrEmail,
  isTrustedUser,
  type TrustedUserSignals,
} from '@app/web/features/indexation/trustedUser'
import { prismaClient } from '@app/web/prismaClient'
import { Command, Option } from '@commander-js/extra-typings'

const batchSize = 1000

const inBatches = async <T>(
  ids: string[],
  getBatch: (batch: string[]) => Promise<Iterable<T>>,
) => {
  const results: T[] = []
  for (let index = 0; index < ids.length; index += batchSize) {
    results.push(...(await getBatch(ids.slice(index, index + batchSize))))
  }
  return results
}

const percent = (part: number, total: number) =>
  total === 0 ? '0 %' : `${((part / total) * 100).toFixed(1)} %`

const outputCount = (label: string, total: number, noindex: number) => {
  output(`${label} : ${total}`)
  output(`  dont passent en noindex : ${noindex} (${percent(noindex, total)})`)
}

// Compte de confiance uniquement grâce aux vues : le seul critère qu'un
// spammeur peut atteindre avec le trafic de ses propres pages indexées
const isTrustedByViewsOnly = (signals: TrustedUserSignals) =>
  isTrustedUser(signals) &&
  !(signals.emailVerified && isGouvFrEmail(signals.email)) &&
  !signals.hasRecommendedPublicResource

/**
 * Lecture seule : mesure l'effet de la règle "utilisateur de confiance" sur
 * l'indexation des pages publiques, avec la même logique que l'application.
 */
export const untrustedUsersReport = new Command('domain:untrusted-users-report')
  .description(
    'Compte les comptes, ressources, collections, profils et bases qui passeraient en noindex (lecture seule)',
  )
  .addOption(DeploymentTargetOption)
  .addOption(
    new Option(
      '--views-only-since <date>',
      'Liste les comptes de confiance par les vues seules créés depuis cette date',
    ).default('2026-08-01'),
  )
  .action(async (args) => {
    await configureDeploymentTarget(args)

    const viewsOnlySince = new Date(args.viewsOnlySince)

    const publicResources = await prismaClient.resource.findMany({
      where: { isPublic: true, published: { not: null }, deleted: null },
      select: { createdById: true },
    })
    const publicCollections = await prismaClient.collection.findMany({
      where: { isPublic: true, deleted: null },
      select: { createdById: true },
    })
    const publicProfiles = await prismaClient.user.findMany({
      where: { isPublic: true, deleted: null },
      select: { id: true, slug: true },
    })
    const publicBases = await prismaClient.base.findMany({
      where: { isPublic: true, deleted: null },
      select: { id: true },
    })

    const authorIds = [
      ...new Set(publicResources.map(({ createdById }) => createdById)),
    ]

    const signals = new Map(
      await inBatches(
        [
          ...new Set([
            ...authorIds,
            ...publicCollections.map(({ createdById }) => createdById),
            ...publicProfiles.map(({ id }) => id),
          ]),
        ],
        getTrustSignals,
      ),
    )
    const isTrusted = (userId: string) => {
      const userSignals = signals.get(userId)
      return !!userSignals && isTrustedUser(userSignals)
    }

    const trustedBaseIds = new Set(
      await inBatches(
        publicBases.map(({ id }) => id),
        getTrustedBaseIds,
      ),
    )

    outputCount(
      'Comptes avec au moins une ressource publique',
      authorIds.length,
      authorIds.filter((id) => !isTrusted(id)).length,
    )
    outputCount(
      'Ressources publiques',
      publicResources.length,
      publicResources.filter(({ createdById }) => !isTrusted(createdById))
        .length,
    )
    outputCount(
      'Collections publiques',
      publicCollections.length,
      publicCollections.filter(({ createdById }) => !isTrusted(createdById))
        .length,
    )
    outputCount(
      'Profils publics',
      publicProfiles.length,
      publicProfiles.filter(({ id }) => !isTrusted(id)).length,
    )
    outputCount(
      'Bases publiques',
      publicBases.length,
      publicBases.filter(({ id }) => !trustedBaseIds.has(id)).length,
    )

    const slugs = new Map(publicProfiles.map(({ id, slug }) => [id, slug]))
    const trustedByViewsOnly = authorIds.filter((id) => {
      const userSignals = signals.get(id)
      return (
        !!userSignals &&
        userSignals.created >= viewsOnlySince &&
        isTrustedByViewsOnly(userSignals)
      )
    })
    output(
      `Comptes de confiance par les vues seules, créés depuis le ${args.viewsOnlySince} : ${trustedByViewsOnly.length}`,
    )
    for (const id of trustedByViewsOnly) {
      const userSignals = signals.get(id)
      output(
        `  ${slugs.get(id) ?? id} : ${userSignals?.publicResourcesViewsCount} vues, créé le ${userSignals?.created.toISOString().slice(0, 10)}`,
      )
    }
  })
