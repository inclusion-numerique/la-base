import { getNewsFeedResources } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
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

const GetNewsFeedResourcesValidation = z.object({
  page: z.number().min(1).default(1),
  themes: z.array(z.string()).default([]),
  professionalSectors: z.array(z.string()).default([]),
  profileSlug: z.string().optional(),
  baseSlug: z.string().optional(),
})

export const newsFeedRouter = router({
  getResources: protectedProcedure
    .input(GetNewsFeedResourcesValidation)
    .query(async ({ input, ctx: { user } }) => {
      const { page, themes, professionalSectors, profileSlug, baseSlug } = input
      const filters = { themes, professionalSectors, profileSlug, baseSlug }
      const paginationParams = { page, perPage: 20, sort: 'recent' as const }

      return getNewsFeedResources(user.id, filters, paginationParams)
    }),
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
          hasCompleteOnboarding: true,
        },
        update: {
          monthlyNewsletter: input.monthlyResume,
          hasCompleteOnboarding: true,
        },
      })
    }),
})
