import { executeFeaturedBlockQuickSearch } from '@app/web/features/administration/landing/db/executeFeaturedBlockSearch'
import { UpdateFeaturedBlockValidation } from '@app/web/features/administration/landing/validation/updateFeaturedBlock'
import { prismaClient } from '@app/web/prismaClient'
import { publicProcedure, router } from '@app/web/server/rpc/createRouter'
import { z } from 'zod'

export const featuredBlockRouter = router({
  quicksearch: publicProcedure
    .input(
      z.object({
        query: z.string(),
        type: z.enum(['base', 'resource', 'profile'] as const),
      }),
    )
    .query(async ({ input, ctx: { user } }) =>
      input.query ? executeFeaturedBlockQuickSearch(input, user) : null,
    ),
  mutate: publicProcedure
    .input(UpdateFeaturedBlockValidation)
    .mutation(async ({ input }) => {
      const { type, blocks } = input

      await prismaClient.featuredBlock.deleteMany({
        where: { type },
      })

      const createData = blocks.map((blockId: string) => ({
        type,
        ...(type === 'base' && { baseId: blockId }),
        ...(type === 'resource' && { resourceId: blockId }),
        ...(type === 'profile' && { profileId: blockId }),
      }))

      return prismaClient.featuredBlock.createMany({
        data: createData,
      })
    }),
})
