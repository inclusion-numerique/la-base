import z from 'zod'

export const UpdateShareableLinkCommandValidation = z
  .object({
    enabled: z.boolean(),
    baseId: z.string().optional(),
    resourceId: z.string().optional(),
  })
  .refine((data) => data.baseId || data.resourceId, {
    message: 'Either baseId or resourceId must be provided',
  })

export type UpdateShareableLinkCommand = z.infer<
  typeof UpdateShareableLinkCommandValidation
>
