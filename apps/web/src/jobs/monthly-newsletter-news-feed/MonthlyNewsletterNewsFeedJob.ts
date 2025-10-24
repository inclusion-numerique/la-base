import z from 'zod'

export const MonthlyNewsletterNewsFeedJobValidation = z.object({
  name: z.literal('monthly-newsletter-news-feed'),
  payload: z.undefined(),
})

export type MonthlyNewsletterNewsFeedJob = z.infer<
  typeof MonthlyNewsletterNewsFeedJobValidation
>
