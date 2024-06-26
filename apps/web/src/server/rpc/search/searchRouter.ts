import { z } from 'zod'
import { publicProcedure, router } from '@app/web/server/rpc/createRouter'
import { executeQuickSearch } from '@app/web/server/search/executeSearch'

export const searchRouter = router({
  quicksearch: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ input, ctx: { user } }) =>
      input.query ? executeQuickSearch(input.query, user) : null,
    ),
})
