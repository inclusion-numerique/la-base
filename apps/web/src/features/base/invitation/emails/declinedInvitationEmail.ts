import { compileMjml } from '@app/emails/mjml'
import { rejectedBaseInvitation } from '@app/emails/templates/rejectedBaseInvitation'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'

export const sendDeclinedInvitationEmail = async ({
  email,
  baseTitle,
  memberName,
}: {
  email: string
  baseTitle: string
  memberName: string
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,

    subject: `Demande de rejoindre la base ${baseTitle} refusée !`,
    text: rejectedBaseInvitation.text({ memberName, baseTitle }),
    html: compileMjml(
      rejectedBaseInvitation.mjml({
        memberName,
        baseTitle,
      }),
    ),
  })

  throwOnSendMailFailure(result)
}
