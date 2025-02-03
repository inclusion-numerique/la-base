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
  // montlucon-communaute-numerique-1
  '3e079e7c-3fd2-442c-a0ec-238f70b3e217',
  // tech-abeille
  '239f6675-7bb6-412c-b137-7d6d60ff46e6',
  // pupil
  '4d27565a-ac35-40e9-bccd-a2172c892ce2',
]

const featuredResourceIds = [
  // formation-parents-ressource
  '47e0a7bb-c4f7-4ce8-a6c4-fd494c7ddf42',
  // prenezlaconfiance
  'e7c62281-e84f-44ba-9478-ed5d94c7b5f9',
  // mallette-cyber-proposition-d-atelier
  '9f935f5b-8d28-4a34-a846-f9c6a45b38a7',
  // atelier-scanner-des-document-via-son-smartphone-ou-sa-tablette
  '856b16e5-efef-43d1-9a96-9dbb7ef28ac9',
  // webinaire-associations-c-est-quoi-le-probleme-avec-les-services-numeriques-des-geants-du-web
  '941bd598-f29e-47a7-aa34-a863809653fa',
  // se-deplacer-avec-son-smartphone
  'e685a243-d93b-4511-9f9a-5137d80e872d',
]

const featuredProfileIds = [
  // jean-claude-bondaz
  '8382a623-96ea-4555-87ba-f5edb8793086',
  // gokce-perol
  'cdfcee5a-8a45-489f-829f-3eb363c22328',
  // jeremy-pastouret
  'da81a805-672e-4ca4-9ead-d6bf9f0f4cc7',
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
