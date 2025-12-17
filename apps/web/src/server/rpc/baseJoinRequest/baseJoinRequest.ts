import { baseAuthorization } from '@app/web/authorization/models/baseAuthorization'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'
import { sendBaseJoinRequestEmail } from '@app/web/features/base/join-requests/emails/sendBaseJoinRequestEmail'
import { sendJoinRequestAcceptedEmail } from '@app/web/features/base/join-requests/emails/sendJoinRequestAcceptedEmail'
import { sendJoinRequestRejectedEmail } from '@app/web/features/base/join-requests/emails/sendJoinRequestRejectedEmail'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  authorizeOrThrow,
  invalidError,
  notFoundError,
} from '@app/web/server/rpc/trpcErrors'
import * as Sentry from '@sentry/nextjs'
import z from 'zod'

export const baseJoinRequestRouter = router({
  askToJoin: protectedProcedure
    .input(z.object({ baseId: z.string().uuid() }))
    .mutation(async ({ input, ctx: { user } }) => {
      const base = await prismaClient.base.findUnique({
        where: { id: input.baseId },
        select: {
          id: true,
          title: true,
          slug: true,
          members: {
            select: {
              memberId: true,
            },
          },
          joinRequests: {
            select: {
              id: true,
              applicantId: true,
              accepted: true,
              declined: true,
            },
          },
        },
      })

      if (!base) {
        return notFoundError()
      }

      const isAlreadyMember = base.members.some(
        (member) => member.memberId === user.id,
      )
      if (isAlreadyMember) {
        return invalidError('Vous êtes déjà membre de cette base')
      }

      const existingRequest = base.joinRequests.find(
        (request) =>
          request.applicantId === user.id && request.declined !== null,
      )
      if (existingRequest) {
        return prismaClient.baseJoinRequest.update({
          where: { id: existingRequest.id },
          data: {
            declined: null,
          },
        })
      }

      const joinRequest = await prismaClient.baseJoinRequest.create({
        data: {
          baseId: input.baseId,
          applicantId: user.id,
        },
        include: {
          applicant: {
            select: {
              email: true,
              name: true,
              slug: true,
              firstName: true,
              lastName: true,
            },
          },
          base: {
            select: {
              title: true,
              members: {
                where: {
                  isAdmin: true,
                },
                include: {
                  member: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      const emailPromises = joinRequest.base.members.map((admin) =>
        sendBaseJoinRequestEmail({
          url: `/demandes/base/${joinRequest.id}`,
          profileUrl: `/profils/${joinRequest.applicant.slug}`,
          email: admin.member.email,
          baseTitle: joinRequest.base.title,
          applicant: {
            slug: joinRequest.applicant.slug,
            name: joinRequest.applicant.name || undefined,
            firstName: joinRequest.applicant.firstName || undefined,
            lastName: joinRequest.applicant.lastName || undefined,
            email: joinRequest.applicant.email,
          },
        }).catch((error) => {
          // silent fail for email sending
          Sentry.captureException(error)
          return null
        }),
      )

      await Promise.all(emailPromises)

      return joinRequest
    }),
  accept: protectedProcedure
    .input(z.object({ requestId: z.string().uuid() }))
    .mutation(async ({ input, ctx: { user } }) => {
      const joinRequest = await prismaClient.baseJoinRequest.findUnique({
        where: { id: input.requestId },
        include: {
          applicant: {
            select: {
              id: true,
              email: true,
              name: true,
              firstName: true,
              lastName: true,
            },
          },
          base: {
            select: {
              title: true,
              slug: true,
              ...baseAuthorizationTargetSelect,
            },
          },
        },
      })

      if (!joinRequest) {
        return notFoundError()
      }

      authorizeOrThrow(
        baseAuthorization(joinRequest.base, user).hasPermission(
          'AddBaseMember',
        ),
      )

      const existingMember = await prismaClient.baseMembers.findUnique({
        where: {
          memberId_baseId: {
            memberId: joinRequest.applicantId,
            baseId: joinRequest.baseId,
          },
        },
      })

      if (existingMember) {
        return invalidError('Cette personne est déjà membre de la base')
      }

      const [newMember] = await prismaClient.$transaction([
        prismaClient.baseMembers.create({
          data: {
            baseId: joinRequest.baseId,
            memberId: joinRequest.applicantId,
            isAdmin: false,
            accepted: new Date(),
          },
        }),
        prismaClient.baseJoinRequest.update({
          where: { id: input.requestId },
          data: {
            accepted: new Date(),
          },
        }),
      ])

      sendJoinRequestAcceptedEmail({
        url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/bases/${joinRequest.base.slug}`,
        email: joinRequest.applicant.email,
        baseTitle: joinRequest.base.title,
        adminName: user.name || user.email,
      }).catch((error) => Sentry.captureException(error))

      return newMember
    }),
  decline: protectedProcedure
    .input(z.object({ requestId: z.string().uuid() }))
    .mutation(async ({ input, ctx: { user } }) => {
      const joinRequest = await prismaClient.baseJoinRequest.findUnique({
        where: { id: input.requestId },
        include: {
          applicant: {
            select: {
              email: true,
              name: true,
              firstName: true,
              lastName: true,
            },
          },
          base: {
            select: {
              title: true,
              ...baseAuthorizationTargetSelect,
            },
          },
        },
      })

      if (!joinRequest) {
        return notFoundError()
      }

      authorizeOrThrow(
        baseAuthorization(joinRequest.base, user).hasPermission(
          'AddBaseMember',
        ),
      )

      await prismaClient.baseJoinRequest.update({
        where: { id: input.requestId },
        data: {
          declined: new Date(),
        },
      })

      sendJoinRequestRejectedEmail({
        email: joinRequest.applicant.email,
        baseTitle: joinRequest.base.title,
        adminName: user.name || user.email,
      }).catch((error) => Sentry.captureException(error))
    }),
  remove: protectedProcedure
    .input(z.object({ baseId: z.string().uuid() }))
    .mutation(async ({ input, ctx: { user } }) => {
      const joinRequest = await prismaClient.baseJoinRequest.findUnique({
        where: {
          applicantId_baseId: {
            applicantId: user.id,
            baseId: input.baseId,
          },
        },
        include: {
          base: {
            select: {
              title: true,
            },
          },
        },
      })

      if (!joinRequest) {
        return notFoundError()
      }

      return prismaClient.baseJoinRequest.delete({
        where: { id: joinRequest.id },
      })
    }),
})
