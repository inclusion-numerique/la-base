import { z } from 'zod'

const InviteTypeMember = z.enum(['admin', 'member'])

export type InviteMemberType = z.infer<typeof InviteTypeMember>

const InviteMember = z.object({
  id: z.string(),
  type: InviteTypeMember,
})

const InviteMemberEmail = z.object({
  type: InviteTypeMember,
  email: z.string(),
})

export const InviteMemberCommandValidation = z
  .object({
    baseId: z.string(),
    isAdmin: z.boolean(),
    members: z.array(InviteMember).optional(),
    newMembers: z.array(InviteMemberEmail).optional(),
  })
  .refine(
    (data) => data.members?.length === 0 && data.newMembers?.length === 0,
    {
      message: 'Veuillez sélectionner au moins un membre à inviter',
      path: ['members'],
    },
  )

export type InviteMemberCommand = z.infer<typeof InviteMemberCommandValidation>
