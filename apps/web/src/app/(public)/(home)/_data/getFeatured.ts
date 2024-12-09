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
  // departement-du-tarn
  '84efe987-74fe-47ac-8b2d-56f24a51db15',
  // icom-provence
  '403f471e-c02c-455a-bd64-5527006f945e',
  // blog-numerique-du-pays-de-bray
  'ef3f41ec-438c-49a6-aee0-63e170b771ed',
]

const featuredResourceIds = [
  // courts-circuits
  '984f7bdd-9b86-4342-b016-9e8a6a7b5bc6',
  // pictionary-3d
  'ca9539d5-a337-45ad-8b32-9f3e3f87372d',
  // comptoir-du-libre
  '8188b084-f8f8-40b0-8f70-30aede46f5a4',
  // france-identite-prouver-son-identite-en-ligne-mais-pas-que
  '72c510fd-93e6-4250-b6ad-5791cbfad393',
  // solutions-de-mobilites-douces-pour-l-inclusion-numerique
  '144d7a15-6391-47db-bd8c-df8fe185ed5e',
  // comment-aider-une-personne-a-connaitre-ses-droits
  'b3a7e0d9-925b-42c5-8e34-a033eaabf20f',
]

const featuredProfileIds = [
  // f-salem
  '1d5d6ba6-0b20-4a81-9d64-ced1e58223f2',
  // julien-daudigeos
  '5ba65f60-f4a3-48e5-94eb-4513ca670052',
  // jeremie-daum
  '36d2137b-286b-4362-945d-cab21a17377f',
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
