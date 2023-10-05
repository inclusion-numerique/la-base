import z from 'zod'

export const ChangeVisibilityCommandValidation = z.object({
  name: z.literal('ChangeVisibility'),
  payload: z.object({
    resourceId: z.string().uuid(),
    isPublic: z.boolean(),
  }),
})

export type ChangeVisibilityCommand = z.infer<
  typeof ChangeVisibilityCommandValidation
>

type VisibilityChangedDataV1 = {
  __version: 1
  isPublic: boolean
}

export type VisibilityChanged = {
  type: 'VisibilityChanged'
  timestamp: Date
  data: VisibilityChangedDataV1
}
