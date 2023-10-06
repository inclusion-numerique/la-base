import { z } from 'zod'
import { publicProcedure, router } from '@app/web/server/rpc/createRouter'
import { quicksearch } from '../../search/quicksearch'

export const searchRouter = router({
  quicksearch: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ input, ctx: { user } }) =>
      input.query ? quicksearch(input.query, user) : null,
    ),
})
