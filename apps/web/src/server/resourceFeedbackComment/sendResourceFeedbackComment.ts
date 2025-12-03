import { z } from 'zod'

export const SendResourceFeedbackCommentClientValidation = z.object({
  content: z
    .string({
      required_error: 'Veuillez renseigner votre commentaire',
    })
    .min(1, 'Veuillez renseigner votre commentaire')
    .trim(),
  feedbackSentById: z.string().uuid(),
  feedbackResourceId: z.string().uuid(),
  parentCommentId: z.string().uuid().nullish(),
})

export type SendResourceFeedbackCommentClientData = z.infer<
  typeof SendResourceFeedbackCommentClientValidation
>

export const SendResourceFeedbackCommentValidation =
  SendResourceFeedbackCommentClientValidation

export type SendResourceFeedbackCommentData = z.infer<
  typeof SendResourceFeedbackCommentValidation
>
