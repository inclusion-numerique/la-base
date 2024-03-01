import z from 'zod'
import { v4 } from 'uuid'
import * as Sentry from '@sentry/nextjs'
import { prismaClient } from '@app/web/prismaClient'
import { baseSelect } from '@app/web/server/bases/getBase'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { InviteMemberCommandValidation } from '@app/web/server/baseMembers/inviteMember'
import {
  authorizeOrThrow,
  invalidError,
  notFoundError,
} from '@app/web/server/rpc/trpcErrors'
import { sendInviteMemberEmail } from '@app/web/server/rpc/baseMember/invitationEmail'
import {
  baseAuthorization,
  BasePermissions,
} from '@app/web/authorization/models/baseAuthorization'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'

export const baseMemberRouter = router({
  invite: protectedProcedure
    .input(InviteMemberCommandValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const base = await prismaClient.base.findUnique({
        where: { id: input.baseId },
        select: {
          ...baseAuthorizationTargetSelect,
          ...baseSelect(user),
        },
      })
      if (!base) {
        return notFoundError()
      }

      authorizeOrThrow(
        baseAuthorization(base, user).hasPermission(
          input.isAdmin ? 'AddBaseAdmin' : 'AddBaseMember',
        ),
      )

      /**
       * Do not re-add existing members
       */
      const memberUserIds = input.members.filter(
        (id) => !base.members.some((member) => member.member.id === id),
      )

      const members = await prismaClient.user.findMany({
        select: { id: true, email: true },
        where: { id: { in: memberUserIds } },
      })

      for (const member of members) {
        const memberId = memberUserIds.find((x) => x === member.id)
        if (memberId) {
          const acceptationToken = v4()
          // eslint-disable-next-line no-await-in-loop
          await prismaClient.baseMembers.create({
            data: {
              baseId: input.baseId,
              isAdmin: input.isAdmin,
              memberId,
              acceptationToken,
            },
          })

          sendInviteMemberEmail({
            baseTitle: base.title,
            from: user,
            url: `/invitations/base/${acceptationToken}`,
            email: member.email,
          }).catch((error) => Sentry.captureException(error))
        }
      }
    }),
  changeRole: protectedProcedure
    .input(
      z.object({
        baseId: z.string(),
        memberId: z.string(),
        isAdmin: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx: { user } }) => {
      const base = await prismaClient.base.findUnique({
        where: { id: input.baseId },
        select: {
          ...baseAuthorizationTargetSelect,
          ...baseSelect(user),
        },
      })

      if (!base) {
        return notFoundError()
      }

      authorizeOrThrow(
        baseAuthorization(base, user).hasPermission(
          BasePermissions.ChangeBaseMemberRole,
        ),
      )

      /**
       * Do not allow removal of last admin
       */
      const hasRemainingAdmin = base.members.some(
        (member) => member.memberId !== input.memberId && member.isAdmin,
      )

      if (!hasRemainingAdmin) {
        return invalidError(
          'Vous ne pouvez pas supprimer le dernier administrateur de cette base',
        )
      }

      return prismaClient.baseMembers.update({
        data: { isAdmin: input.isAdmin },
        where: {
          memberId_baseId: { baseId: input.baseId, memberId: input.memberId },
        },
      })
    }),
  remove: protectedProcedure
    .input(z.object({ baseId: z.string(), memberId: z.string() }))
    .mutation(async ({ input, ctx: { user } }) => {
      const base = await prismaClient.base.findUnique({
        where: { id: input.baseId },
        select: {
          ...baseAuthorizationTargetSelect,
          ...baseSelect(user),
        },
      })

      if (!base) {
        return notFoundError()
      }

      authorizeOrThrow(
        baseAuthorization(base, user).hasPermission(
          BasePermissions.RemoveBaseMember,
        ),
      )

      /**
       * Do not allow removal of last admin
       */
      const hasRemainingAdmin = base.members.some(
        (member) => member.memberId !== input.memberId && member.isAdmin,
      )

      if (!hasRemainingAdmin) {
        return invalidError(
          'Vous ne pouvez pas supprimer le dernier administrateur de cette base',
        )
      }

      return prismaClient.baseMembers.delete({
        where: { memberId_baseId: input },
      })
    }),
})
