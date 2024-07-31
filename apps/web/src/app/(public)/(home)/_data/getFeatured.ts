import { prismaClient } from '@app/web/prismaClient'
import { baseSelect } from '@app/web/server/bases/getBasesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import { profileListSelect } from '@app/web/server/profiles/getProfilesList'

const featuredBaseIds = [
  // solidarite-numerique
  '4ebed26b-3e89-4af0-aec2-44781aa527d6',
  // panoramax
  'c4027f6b-3800-4483-bd85-b4687958df2d',
  // la-veille-et-les-ressources-du-collectif-coll-in
  'c16cb46e-f254-4be2-9396-2f0b85fb7fcf',
]

const featuredResourceIds = [
  // tutoriel-des-communs-numeriques
  '74f03c0f-2853-4450-9243-59ccd292386a',
  // le-puzzle-de-la-mediation-numerique-version-grand-est
  '8c5e247d-091c-4bef-a0c9-1f4aaf2a685f',
  // guide-contre-la-desinformation-dicod
  '73669768-57b8-442e-9d46-afae2963db05',
  // introduction-a-la-demarche-numerique-responsable
  '80c49d94-e9d3-4dab-bc11-f91e4218a92f',
  // comment-securiser-ses-achats-sur-internet
  '5d820fd5-1660-47e1-83f9-3bf8dacee5b9',
  // repertoire-d-annuaires-d-intelligences-artificielles
  '06c26cec-33a5-4fbc-b1c9-f254bdba66dc',
]

const featuredProfileIds = [
  // eleonore-geneix
  '010ba393-75bf-4627-ad2a-969ab9fc71d1',
  // lionel-rauch
  'd6ced44c-354d-483a-99d0-a7f4de48e484',
  // garlann-nizon
  '589e8b7f-52f1-4d6a-8123-cc5b235a3b64',
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
