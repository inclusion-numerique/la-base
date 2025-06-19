import z from 'zod'

export const SendResourceFeedbackClientValidation = z.object({
  rating: z
    .string({
      required_error: 'Veuillez renseigner le niveau de satisfaction',
    })
    .regex(/^[1-4]$/),
  comment: z
    .string()
    .trim()
    .transform((comment) => comment || null)
    .nullish(),
  resourceId: z.string(),
})

export type SendResourceFeedbackClientData = z.infer<
  typeof SendResourceFeedbackClientValidation
>

export const SendResourceFeedbackValidation =
  SendResourceFeedbackClientValidation.extend({
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
