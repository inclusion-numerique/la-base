import { z } from 'zod'

export const UpdateResourceFeedbackCommentClientValidation = z.object({
  commentId: z.string().uuid(),
  content: z
    .string({
      required_error: 'Veuillez renseigner votre commentaire',
    })
    .min(1, 'Veuillez renseigner votre commentaire')
    .trim(),
})

export type UpdateResourceFeedbackCommentClientData = z.infer<
  typeof UpdateResourceFeedbackCommentClientValidation
>

export const UpdateResourceFeedbackCommentValidation =
  UpdateResourceFeedbackCommentClientValidation

export type UpdateResourceFeedbackCommentData = z.infer<
  typeof UpdateResourceFeedbackCommentValidation
>
