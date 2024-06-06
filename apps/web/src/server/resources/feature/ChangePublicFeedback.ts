import z from 'zod'

export const ChangePublicFeedbackCommandValidation = z.object({
  name: z.literal('ChangePublicFeedback'),
  payload: z.object({
    resourceId: z.string().uuid(),
    publicFeedback: z.boolean(),
  }),
})

export type ChangePublicFeedbackCommand = z.infer<
  typeof ChangePublicFeedbackCommandValidation
>

type PublicFeedbackChangedDataV1 = {
  __version: 1
  publicFeedback: boolean
}

export type PublicFeedbackChanged = {
  type: 'PublicFeedbackChanged'
  timestamp: Date
  data: PublicFeedbackChangedDataV1
}
