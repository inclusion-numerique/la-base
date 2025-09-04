import { compileMjml } from '@app/emails/mjml'
import { inviteMember } from '@app/emails/templates/inviteMember'
import { SessionUser } from '@app/web/auth/sessionUser'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'

export const sendInviteMemberEmail = async ({
  url,
  email,
  baseTitle,
  newMember = false,
  from,
}: {
  url: string
  email: string
  baseTitle: string
  newMember?: boolean
  from: SessionUser
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,

    subject: `Invitation à rejoindre la base ${baseTitle}`,
    text: inviteMember.text({ url, baseTitle }),
    html: compileMjml(
      inviteMember.mjml({
        url,
        baseTitle,
        from: from.name || '',
        newMember,
      }),
    ),
  })

  throwOnSendMailFailure(result)
}
