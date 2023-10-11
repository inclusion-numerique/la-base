import z from 'zod'
import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { getBase } from '@app/web/server/bases/getBase'
import { filterAccess } from '@app/web/server/bases/authorization'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, notFoundError, invalidError } from '../trpcErrors'
import { InviteMemberCommandValidation } from '../../baseMembers/inviteMember'
import { sendInviteMemberEmail } from './invitationEmail'

export const baseMemberRouter = router({
  invite: protectedProcedure
    .input(InviteMemberCommandValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const base = await getBase(input.baseId, user)
      if (!base) {
        return notFoundError()
      }
      const authorizations = filterAccess(base, user)
      if (!authorizations.authorized || !authorizations.isMember) {
        return forbiddenError()
      }

      if (input.isAdmin && !authorizations.isAdmin) {
        return forbiddenError()
      }

      if (
        base.members.some((member) => input.members.includes(member.member.id))
      ) {
        return invalidError()
      }

      const members = await prismaClient.user.findMany({
        select: { id: true, email: true },
        where: { id: { in: input.members } },
      })

      for (const member of members) {
        const memberId = input.members.find((x) => x === member.id)
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
            url: `/bases/${base.slug}/invitations/accepter/${acceptationToken}`,
            email: member.email,
          })
            // TODO: a sentry here would be nice
            .catch(() => console.log('Email non envoyé'))
        }
      }
    }),
  mutate: protectedProcedure
    .input(
      z.object({
        baseId: z.string(),
        memberId: z.string(),
        isAdmin: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx: { user } }) => {
      const base = await getBase(input.baseId, user)
      if (!base) {
        return notFoundError()
      }

      const authorizations = filterAccess(base, user)
      if (!authorizations.authorized || !authorizations.isAdmin) {
        return forbiddenError()
      }

      if (
        !base.members.some(
          (member) => member.memberId !== input.memberId && member.isAdmin,
        )
      ) {
        return forbiddenError()
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
      const base = await getBase(input.baseId, user)
      if (!base) {
        return notFoundError()
      }
      const authorizations = filterAccess(base, user)
      if (!authorizations.authorized || !authorizations.isAdmin) {
        return forbiddenError()
      }

      if (
        !base.members.some(
          (member) => member.memberId !== input.memberId && member.isAdmin,
        )
      ) {
        return forbiddenError()
      }

      return prismaClient.baseMembers.delete({
        where: { memberId_baseId: input },
      })
    }),
})
