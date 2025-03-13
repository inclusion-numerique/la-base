import z from 'zod'

export const ImportContactsToBrevoValidation = z.object({
  name: z.literal('import-contacts-to-brevo'),
  payload: z.undefined(),
})

export type ImportContactsToBrevoJob = z.infer<
  typeof ImportContactsToBrevoValidation
>
