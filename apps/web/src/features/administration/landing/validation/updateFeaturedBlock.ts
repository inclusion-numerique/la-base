import { z } from 'zod'

const blockIdValidation = z.string().uuid()

export const UpdateFeaturedBlockValidation = z.object({
  type: z.enum(['base', 'resource', 'profile']),
  blocks: z.array(blockIdValidation),
})

export type UpdateFeaturedBlockCommand = z.infer<
  typeof UpdateFeaturedBlockValidation
>
