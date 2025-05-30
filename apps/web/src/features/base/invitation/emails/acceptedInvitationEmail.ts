import { compileMjml } from '@app/emails/mjml'
import { acceptedBaseInvitation } from '@app/emails/templates/acceptedBaseInvitation'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'

export const sendAcceptedInvitationEmail = async ({
  url,
  email,
  baseTitle,
  memberName,
}: {
  url: string
  email: string
  baseTitle: string
  memberName: string
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,

    subject: `Demande de rejoindre la base ${baseTitle} acceptée !`,
    text: acceptedBaseInvitation.text({ memberName, baseTitle }),
    html: compileMjml(
      acceptedBaseInvitation.mjml({
        url,
        memberName,
        baseTitle,
      }),
    ),
  })

  throwOnSendMailFailure(result)
}
