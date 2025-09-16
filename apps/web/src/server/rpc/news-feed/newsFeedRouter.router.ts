import { UpdateNewsFeedSectorsProfessionnalsValidation } from '@app/web/features/fil-d-actualite/onboarding/professionals-sectors/newsFeedProfessionnalsSectors'
import { UpdateNewsFeedResumeValidation } from '@app/web/features/fil-d-actualite/onboarding/resume/newsFeedResume'
import { UpdateNewsFeedThemesValidation } from '@app/web/features/fil-d-actualite/onboarding/themes/newsFeedThemes'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { ProfessionalSector, Theme } from '@prisma/client'

import z from 'zod'

const UpdateNewsFeedValidation = z.object({
  professionalSectors: z.array(z.nativeEnum(ProfessionalSector)).optional(),
  themes: z.array(z.nativeEnum(Theme)).optional(),
})

export const newsFeedRouter = router({
  skip: protectedProcedure
    .input(z.object({ hasCompleteOnboarding: z.boolean() }))
    .mutation(async ({ input, ctx: { user } }) => {
      const newsFeed = await prismaClient.newsFeed.findFirst({
        where: { userId: user.id },
      })
      if (!newsFeed) {
        return prismaClient.newsFeed.create({
          data: {
            userId: user.id,
            hasCompleteOnboarding: input.hasCompleteOnboarding,
          },
        })
      }
      return prismaClient.newsFeed.update({
        where: { userId: user.id },
        data: { hasCompleteOnboarding: input.hasCompleteOnboarding },
      })
    }),
  updateProfessionalSectors: protectedProcedure
    .input(UpdateNewsFeedSectorsProfessionnalsValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      return prismaClient.newsFeed.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          professionalSectors: input.professionalSectors,
        },
        update: {
          professionalSectors: input.professionalSectors,
        },
      })
    }),

  updateThemes: protectedProcedure
    .input(UpdateNewsFeedThemesValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      return prismaClient.newsFeed.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          themes: input.themes,
        },
        update: {
          themes: input.themes,
        },
      })
    }),

  update: protectedProcedure
    .input(UpdateNewsFeedValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const updateData: Record<string, any> = {}

      if (input.professionalSectors !== undefined) {
        updateData.professionalSectors = input.professionalSectors
      }
      if (input.themes !== undefined) {
        updateData.themes = input.themes
      }

      return prismaClient.newsFeed.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          ...updateData,
        },
        update: updateData,
      })
    }),

  updateMonthlyNewsletter: protectedProcedure
    .input(UpdateNewsFeedResumeValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      return prismaClient.newsFeed.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          monthlyNewsletter: input.monthlyResume,
        },
        update: {
          monthlyNewsletter: input.monthlyResume,
        },
      })
    }),
})
