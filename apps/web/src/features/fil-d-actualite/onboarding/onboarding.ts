import z from 'zod'

export const NewsFeedSkipOnboardingValidation = z.object({
  hasCompleteOnboarding: z.boolean(),
})

export type NewsFeedSkipOnboardingCommand = z.infer<
  typeof NewsFeedSkipOnboardingValidation
>
