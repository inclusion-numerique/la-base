import { prismaClient } from '@app/web/prismaClient'
import { baseSelect } from '@app/web/server/bases/getBasesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import { profileListSelect } from '@app/web/server/profiles/getProfilesList'

// Updated on 2024-08-30
const featuredBaseIds = [
  // direction-interministerielle-du-numerique-dinum
  '7e552766-ec7a-4531-9bf4-eb81f364ac96',
  // la-coop-de-la-mediation-numerique
  '13c42351-4658-4f93-becf-1dac55264e01',
  // parentalite-et-numerique
  '543f91bc-8215-4b27-a9af-a7fb14348324',
]

const featuredResourceIds = [
  // exposition-legende-urbaine-la-story-de-mon-smartphone
  '5c24658d-a639-4878-a6b7-effbdfca7191',
  // jeu-numetco
  '66c217db-1f70-48fd-bb88-715344de628f',
  // decouverte-du-tableur-avec-libre-office-calc
  '318e2f87-14db-4074-9452-bb3d61dc82fa',
  // diagnostiquer-son-ordinateur
  '4577136a-fb5a-4816-b2f8-e13bcca77fe5',
  // initiation-intelligence-artificielle-ia
  '2770adc6-286a-4469-8115-6b631b7c0168',
  // panorama-sur-les-reseaux-sociaux-chiffres-et-bonnes-pratiques-pour-les-comprendre-et-les-utiliser
  'd766f682-4d63-434a-9a6c-46c4226bbe81',
]

const featuredProfileIds = [
  // louis-derrac
  'df80840b-be80-4dfa-847b-b4246aee5c54',
  // eric-antier
  '434e6b82-ddb0-4ecd-992c-9aacfaf07ab7',
  // claire-bl
  'fce7f55b-56a1-4a3e-b80c-c0a75dd10d4d',
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
