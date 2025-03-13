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
  // commentry-montmarault-neris-communaute
  '0d6f8e44-0a67-4ba7-84a1-6a0aac180a8d',
  // blog-numerique-du-pays-de-bray
  'ef3f41ec-438c-49a6-aee0-63e170b771ed',
  // agglomeration-du-pays-de-l-or-34
  '432d9e02-cf5a-41f9-98ab-326580ead981',
]

const featuredResourceIds = [
  // tnt-vod-svod-streaming-decryptage-de-la-nouvelle-ere-du-divertissement-video
  'faa069d3-893f-4707-964f-33083d8ab016',
  // webinaire-adopter-des-outils-ethiques-dans-mon-association
  '1491ebaa-4799-4b1d-bfcb-446e90e2b060',
  // utilisation-de-base-canva
  '8fa8bda0-c3f5-4ce9-8578-4388915137a8',
  // installer-deepseek-en-local-sur-linux
  'd1d7b2ee-2877-4a6e-ae03-3d55e602dd27',
  // fiche-resume-copiercoller
  'b6aa2fc0-7f68-4601-b2ba-109f2789bc03',
  // webinaire-intelligence-artificielle-avec-josephine-corcoral-du-cnnum
  '5abbe71d-b29a-4d34-b0a8-dca2a07cfeb5',
]

const featuredProfileIds = [
  // garlann-nizon
  '589e8b7f-52f1-4d6a-8123-cc5b235a3b64',
  // jehane-reneault
  'd938a973-bbaa-415b-81c7-0dfa30eda275',
  // margaux-joyen-dufau
  '9189cca5-347d-4e26-89eb-0cdfb95f63de',
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
