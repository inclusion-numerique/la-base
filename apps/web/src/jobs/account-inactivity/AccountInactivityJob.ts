import z from 'zod'

export const AccountInactivityJobValidation = z.object({
  name: z.literal('account-inactivity'),
  payload: z.undefined(),
})

export type AccountInactivityJob = z.infer<
  typeof AccountInactivityJobValidation
>
