import { z } from 'zod'

const InviteTypeMember = z.enum(['admin', 'member'])

export type InviteMemberType = z.infer<typeof InviteTypeMember>

const InviteMember = z.object({
  id: z.string(),
  type: InviteTypeMember,
})

export const InviteMemberEmail = z.object({
  type: InviteTypeMember,
  email: z.string(),
})

export const InviteMemberCommandValidation = z.object({
  baseId: z.string(),
  isAdmin: z.boolean(),
  members: z.array(InviteMember).optional(),
  newMembers: z.array(InviteMemberEmail).optional(),
})

export type InviteMemberCommand = z.infer<typeof InviteMemberCommandValidation>
