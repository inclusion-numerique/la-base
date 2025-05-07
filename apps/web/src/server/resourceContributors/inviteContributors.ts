import { z } from 'zod'

export const InviteContributorCommandValidation = z.object({
  resourceId: z.string(),
  contributors: z
    .array(z.string())
    .min(1, 'Veuillez sélectionner au moins un membre à inviter'),
})

export type InviteContributorCommand = z.infer<
  typeof InviteContributorCommandValidation
>
