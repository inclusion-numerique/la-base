import {
  BasePermissions,
  baseAuthorization,
} from '@app/web/authorization/models/baseAuthorization'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'
import { InviteMemberCommandValidation } from '@app/web/features/base/invitation/db/inviteMember'
import { sendAcceptedInvitationEmail } from '@app/web/features/base/invitation/emails/acceptedInvitationEmail'
import { sendDeclinedInvitationEmail } from '@app/web/features/base/invitation/emails/declinedInvitationEmail'
import { sendInviteMemberEmail } from '@app/web/features/base/invitation/emails/invitationEmail'
import { prismaClient } from '@app/web/prismaClient'
import { baseSelect } from '@app/web/server/bases/getBase'
import {
  protectedProcedure,
  publicProcedure,
  router,
} from '@app/web/server/rpc/createRouter'
import {
  authorizeOrThrow,
  invalidError,
  notFoundError,
} from '@app/web/server/rpc/trpcErrors'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'
import * as Sentry from '@sentry/nextjs'
import { v4 } from 'uuid'
import z from 'zod'

export const formatMemberName = (member: {
  name: string | null
  firstName: string | null
  lastName: string | null
  email: string
}) => {
  if (member.name) return member.name
  if (member.firstName && member.lastName) {
    return `${member.firstName} ${member.lastName}`.trim()
  }
  return member.email
}

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

      if (input.members && input.members.length > 0) {
        /**
         * Do not re-add existing members
         */
        const membersIdsAndRole = input.members.filter(
          (inputMember) =>
            !base.members.some(
              (baseMember) => baseMember.member.id === inputMember.id,
            ),
        )
        const membersUserIds = membersIdsAndRole.map((m) => m.id)

        const members = await prismaClient.user.findMany({
          select: { id: true, email: true },
          where: { id: { in: membersUserIds } },
        })

        for (const member of members) {
          const memberWithRole = membersIdsAndRole.find(
            (m) => m.id === member.id,
          )
          if (memberWithRole) {
            const acceptationToken = v4()
            await prismaClient.baseMembers.create({
              data: {
                baseId: input.baseId,
                isAdmin: memberWithRole.type === 'admin',
                invitedById: user.id,
                memberId: memberWithRole.id,
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
      }

      if (input.newMembers && input.newMembers.length > 0) {
        const existingUsers = await prismaClient.user.findMany({
          where: {
            email: {
              in: input.newMembers.map((member) => member.email),
            },
          },
        })

        /**
         * Do not re-add existing members in the base
         */
        const membersToProcess = input.newMembers.filter(
          (inputMember) =>
            !base.members.some(
              (baseMember) => baseMember.member.email === inputMember.email,
            ),
        )

        const createBaseMember = async (
          member: { email: string; type: string },
          memberId: string,
        ) => {
          const acceptationToken = v4()
          await prismaClient.baseMembers.create({
            data: {
              baseId: input.baseId,
              isAdmin: member.type === 'admin',
              invitedById: user.id,
              memberId,
              acceptationToken,
            },
          })
          sendInviteMemberEmail({
            baseTitle: base.title,
            newMember: true,
            from: user,
            url: `/invitations/base/${acceptationToken}`,
            email: member.email,
          }).catch((error) => Sentry.captureException(error))
        }

        // We process existing users accounts first to avoid creating new users if they already exist
        const existingUsersToAdd = membersToProcess.filter((inputMember) =>
          existingUsers.some(
            (existingUser) => existingUser.email === inputMember.email,
          ),
        )

        for (const member of existingUsersToAdd) {
          const existingUser = existingUsers.find(
            (u) => u.email === member.email,
          )
          if (existingUser) {
            await createBaseMember(member, existingUser.id)
          }
        }

        const newUsersToAdd = membersToProcess.filter(
          (inputMember) =>
            !existingUsers.some(
              (existingUser) => existingUser.email === inputMember.email,
            ),
        )

        for (const member of newUsersToAdd) {
          const slug = await createAvailableSlug('utilisateur', 'users')
          const createdUser = await prismaClient.user.create({
            data: {
              email: member.email,
              slug,
            },
          })
          await createBaseMember(member, createdUser.id)
        }
      }
    }),
  acceptInvitation: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const invitation = await prismaClient.baseMembers.findUnique({
        include: {
          base: { select: { title: true, slug: true } },
          invitedBy: { select: { email: true } },
          member: {
            select: {
              email: true,
              name: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        where: { id: input.id },
      })

      if (!invitation) {
        return notFoundError()
      }

      if (invitation.accepted) {
        return invalidError('Cette invitation a déjà été acceptée')
      }

      if (invitation.invitedBy) {
        const memberName = formatMemberName(invitation.member)
        await sendAcceptedInvitationEmail({
          url: `/bases/${invitation.base.slug}`,
          baseTitle: invitation.base.title,
          email: invitation.invitedBy.email,
          memberName,
        })
      }

      return prismaClient.baseMembers.update({
        data: { acceptationToken: null, accepted: new Date() },
        where: { id: invitation.id },
      })
    }),
  declineInvitation: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const invitation = await prismaClient.baseMembers.findUnique({
        include: {
          base: { select: { title: true } },
          invitedBy: { select: { email: true } },
          member: {
            select: {
              email: true,
              name: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        where: { id: input.id },
      })

      if (!invitation) {
        return notFoundError()
      }

      if (invitation.invitedBy) {
        const memberName = formatMemberName(invitation.member)
        await sendDeclinedInvitationEmail({
          baseTitle: invitation.base.title,
          email: invitation.invitedBy.email,
          memberName,
        })
      }
      return prismaClient.baseMembers.delete({
        where: { id: input.id },
      })
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
  leave: protectedProcedure
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

      return prismaClient.baseMembers.delete({
        where: { memberId_baseId: input },
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
