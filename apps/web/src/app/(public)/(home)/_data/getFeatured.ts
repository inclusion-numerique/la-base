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
  // pimms-mediation-cenon
  'd9effe0e-3169-4698-9e7a-31a45379939c',
  // mission-numerique-responsable-anct
  '1bad9b9e-e965-4f93-8118-b1a476809a3d',
  // les-enovateurs
  'bb63fe55-9c08-48ac-89dd-a23374e9d68f',
]

const featuredResourceIds = [
  // kit-atelier-college-bienvenue-les-6eme-cycle-3-et-4-8-12-ans
  '73f567f8-914b-4885-b716-7eda9994a9f7',
  // aie-aie-ia
  'fe0f0069-c0e5-49bc-a92e-9323736370d7',
  // memo-les-risques-du-numerique
  '12795fc5-ce46-4d80-9ff9-735ff9b04a65',
  // stirling-pdf-service-auto-heberge-de-manipulation-de-pdf
  'b48d4392-9c5d-4269-8953-85144410e90b',
  // les-cookies-informatiques
  'c1968dbe-d922-4c23-b677-593bdfe07a4d',
  // conference-le-monde-x-nec-internet-et-les-jeunes-de-quoi-avons-nous-peur
  '416520f9-84d5-4d44-a271-c716b39339ec',
]

const featuredProfileIds = [
  // paul-emile-guyon-gellin
  '74ace0b1-0c5d-491c-9468-a887f43b7178',
  // laura-jarnet
  'f48eb463-497d-4af4-8ad0-839f4900be7f',
  // elise-derose
  'dfb0cfc7-219b-4ac6-b2b5-9852a23342a4',
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
