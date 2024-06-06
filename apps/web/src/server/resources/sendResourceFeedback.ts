import z from 'zod'

export const SendResourceFeedbackValidation = z.object({
  rating: z.preprocess(
    (value) => (value == null ? value : Number.parseInt(value as string, 10)),
    z
      .number({
        required_error: 'Veuillez renseigner le niveau de satisfaction',
      })
      .int()
      .min(1)
      .max(4),
  ),
  comment: z
    .string()
    .trim()
    .transform((comment) => comment || null)
    .nullish(),
  resourceId: z.string(),
})

export type SendResourceFeedbackData = z.infer<
  typeof SendResourceFeedbackValidation
>

export type SendResourceFeedbackFormData = Omit<
  SendResourceFeedbackData,
  'rating'
> & {
  rating: string
}
