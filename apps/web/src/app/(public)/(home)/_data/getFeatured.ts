import { prismaClient } from '@app/web/prismaClient'
import { baseSelect } from '@app/web/server/bases/getBasesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import { profileListSelect } from '@app/web/server/profiles/getProfilesList'

const featuredBaseIds = [
  // pix
  '56da871e-f299-4f5f-a4ec-337957871a5e',
  // ACIAH, Accessibilité, Accompagnement du Handicap
  'b01dc678-89eb-4337-ac50-fc0ce4745f66',
  // Institut du numérique responsable
  '83a638a4-62b2-45df-9664-2467a5d1e53b',
  // Ma Culture Numérique
  // '9324c807-74cb-422f-b4d8-7f0f44c96825',
  // Numericatous
  // '3b4549e1-5c7c-4cca-b717-c311c8645b1d',
  // Rés’in
  // '40bcfd54-d644-4260-9971-001510fcced3',
  // Cybermalveillance.gouv.fr
  // '3f76ddd8-60ad-43ef-a4cc-b93d9a9dd116',
  // Internet Sans Crainte (Tralalère)
  // '35dcef50-e7e6-4ae8-aea5-2bca06ed8094',
]

const featuredResourceIds = [
  // France Numérique Ensemble : c'est quoi ?
  'f3cf7aef-a9e0-4b76-bebb-06ab903feadb',
  // Souris adaptée pour personne en situation de handicap - Lauréat AMI Outiller la médiation numérique
  '463c92c1-8f4c-4b93-8758-5ec28d16c75d',
  // Achats en ligne
  'd0643a35-a406-4994-934c-79b907652f2f',
  // Mémo Geste
  'db077fd8-2bbd-40d1-be9a-0746bb18e2f4',
  // A vous de jouer : Réduisez votre impact numérique !
  '5693e198-c6bb-4b64-ab28-7741d4ea6a37',
  // Glossaire des acteurs et dispositifs de l'inclusion numérique
  '0e909581-7f23-4117-8932-0f95a125ad4a',
]

const featuredProfileIds = [
  // Guillaume Gobert
  '636945f7-ee25-41c6-b912-93e861ea0a93',
  // Tiffanie Train
  '2fc666cb-4bb7-42b5-a8d4-a94f6a91f9f2',
  // Othman Ben Brahim
  '5379dd60-4f2d-406f-9538-155f074814a6',
]

export const getFeatured = async ({ user }: { user: SessionUser | null }) => {
  const [featuredBases, featuredResources, featuredProfiles] =
    await Promise.all([
      prismaClient.base.findMany({
        where: {
          id: { in: featuredBaseIds },
          deleted: null,
          isPublic: true,
        },
        select: baseSelect(user),
      }),
      prismaClient.resource
        .findMany({
          where: {
            id: { in: featuredResourceIds },
            deleted: null,
            isPublic: true,
          },
          select: resourceListSelect(user),
        })
        .then((resources) => resources.map(toResourceWithFeedbackAverage)),
      prismaClient.user.findMany({
        where: {
          id: { in: featuredProfileIds },
          deleted: null,
          isPublic: true,
        },
        select: profileListSelect(user),
      }),
    ])

  return {
    // Order them by the order of the ID arrays
    featuredBases: featuredBases.sort(
      (a, b) => featuredBaseIds.indexOf(a.id) - featuredBaseIds.indexOf(b.id),
    ),
    featuredResources: featuredResources.sort(
      (a, b) =>
        featuredResourceIds.indexOf(a.id) - featuredResourceIds.indexOf(b.id),
    ),
    featuredProfiles: featuredProfiles.sort(
      (a, b) =>
        featuredProfileIds.indexOf(a.id) - featuredProfileIds.indexOf(b.id),
    ),
  }
}
