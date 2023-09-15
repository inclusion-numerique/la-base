import { z } from 'zod'

export const InviteMemberCommandValidation = z.object({
  baseId: z.string(),
  isAdmin: z.boolean(),
  members: z
    .array(z.string())
    .min(1, 'Veuillez selectionner au moins un membre à inviter'),
})

export type InviteMemberCommand = z.infer<typeof InviteMemberCommandValidation>
