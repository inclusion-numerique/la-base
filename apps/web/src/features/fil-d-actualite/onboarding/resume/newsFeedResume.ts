import z from 'zod'

export const UpdateNewsFeedResumeValidation = z.object({
  monthlyResume: z.boolean(),
})

export type UpdateNewsFeedResumeCommand = z.infer<
  typeof UpdateNewsFeedResumeValidation
>
