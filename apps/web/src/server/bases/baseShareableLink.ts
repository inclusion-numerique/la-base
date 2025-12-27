import z from 'zod'

export const UpdateBaseShareableLinkCommandValidation = z.object({
  enabled: z.boolean(),
  baseId: z.string(),
})

export type UpdateBaseShareableLinkCommand = z.infer<
  typeof UpdateBaseShareableLinkCommandValidation
>
