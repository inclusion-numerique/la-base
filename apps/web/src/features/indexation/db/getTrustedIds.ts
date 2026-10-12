import {
  getMinAccountAgeCreatedBefore,
  isTrustedUser,
  recommendationMinRating,
  type TrustedUserSignals,
} from '@app/web/features/indexation/trustedUser'
import { prismaClient } from '@app/web/prismaClient'
import { Prisma } from '@prisma/client'

/**
 * Calcule à la volée, en une requête agrégée, les signaux de confiance des
 * utilisateurs donnés (les comptes supprimés sont ignorés). Seules comptent les
 * ressources dont l'utilisateur est le créateur, publiées, publiques et non
 * supprimées. Une recommandation ne compte que si son auteur a l'ancienneté
 * requise, n'est pas supprimé, et n'est ni créateur ni contributeur de la
 * ressource.
 */
export const getTrustSignals = async (
  userIds: string[],
  now: Date = new Date(),
): Promise<Map<string, TrustedUserSignals>> => {
  if (userIds.length === 0) {
    return new Map()
  }

  const rows = await prismaClient.$queryRaw<
    {
      id: string
      email: string
      email_verified: Date | null
      created: Date
      public_resources_views_count: number
      has_recommended_public_resource: boolean
    }[]
  >(Prisma.sql`
    SELECT users.id,
           users.email,
           users.email_verified,
           users.created,
           COALESCE(SUM(resources.views_count), 0)::int AS public_resources_views_count,
           COALESCE(BOOL_OR(EXISTS (
             SELECT 1
             FROM resource_feedback
             INNER JOIN users AS recommenders ON recommenders.id = resource_feedback.sent_by_id
             WHERE resource_feedback.resource_id = resources.id
               AND resource_feedback.deleted IS NULL
               AND resource_feedback.rating >= ${recommendationMinRating}
               AND resource_feedback.sent_by_id <> users.id
               AND recommenders.deleted IS NULL
               AND recommenders.created <= ${getMinAccountAgeCreatedBefore(now)}
               AND NOT EXISTS (
                 SELECT 1
                 FROM resource_contributors
                 WHERE resource_contributors.resource_id = resources.id
                   AND resource_contributors.contributor_id = resource_feedback.sent_by_id
               )
           )), false) AS has_recommended_public_resource
    FROM users
    LEFT JOIN resources ON resources.created_by_id = users.id
      AND resources.is_public = true
      AND resources.published IS NOT NULL
      AND resources.deleted IS NULL
    WHERE users.id = ANY(${userIds}::uuid[])
      AND users.deleted IS NULL
    GROUP BY users.id
  `)

  return new Map(
    rows.map((row) => [
      row.id,
      {
        email: row.email,
        emailVerified: row.email_verified,
        created: row.created,
        publicResourcesViewsCount: row.public_resources_views_count,
        hasRecommendedPublicResource: row.has_recommended_public_resource,
      },
    ]),
  )
}

export const getTrustedUserIds = async (
  userIds: string[],
  now: Date = new Date(),
): Promise<Set<string>> => {
  const signals = await getTrustSignals(userIds, now)

  return new Set(
    [...signals]
      .filter(([, userSignals]) => isTrustedUser(userSignals, now))
      .map(([id]) => id),
  )
}

/**
 * Une base est de confiance si au moins un de ses membres (invitation
 * acceptée) l'est.
 */
export const getTrustedBaseIds = async (
  baseIds: string[],
  now: Date = new Date(),
): Promise<Set<string>> => {
  if (baseIds.length === 0) {
    return new Set()
  }

  const members = await prismaClient.baseMembers.findMany({
    where: { baseId: { in: baseIds }, accepted: { not: null } },
    select: { baseId: true, memberId: true },
  })

  const trustedUserIds = await getTrustedUserIds(
    [...new Set(members.map(({ memberId }) => memberId))],
    now,
  )

  return new Set(
    members
      .filter(({ memberId }) => trustedUserIds.has(memberId))
      .map(({ baseId }) => baseId),
  )
}

export const isTrustedUserId = async (userId: string) =>
  (await getTrustedUserIds([userId])).has(userId)

export const isTrustedBaseId = async (baseId: string) =>
  (await getTrustedBaseIds([baseId])).has(baseId)
