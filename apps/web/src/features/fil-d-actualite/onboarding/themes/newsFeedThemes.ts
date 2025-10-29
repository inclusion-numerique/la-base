import { Theme } from '@prisma/client'
import z from 'zod'

export const UpdateNewsFeedThemesValidation = z.object({
  themes: z.array(z.nativeEnum(Theme)),
})

export type UpdateNewsFeedThemesCommand = z.infer<
  typeof UpdateNewsFeedThemesValidation
>
