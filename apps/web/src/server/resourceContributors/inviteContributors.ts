import { InviteMemberEmail } from '@app/web/features/base/invitation/db/inviteMember'
import { z } from 'zod'

const InviteContributor = z.object({
  id: z.string(),
})

export const InviteContributorCommandValidation = z.object({
  resourceId: z.string(),
  contributors: z.array(InviteContributor).optional(),
  newMembers: z.array(InviteMemberEmail).optional(),
})

export type InviteContributorCommand = z.infer<
  typeof InviteContributorCommandValidation
>
