import { compileMjml } from '@app/emails/mjml'
import { acceptedBaseJoinRequest } from '@app/emails/templates/acceptedBaseJoinRequest'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'

export const sendJoinRequestAcceptedEmail = async ({
  url,
  email,
  baseTitle,
  adminName,
}: {
  url: string
  email: string
  baseTitle: string
  adminName: string
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,
    subject: `${adminName} a accepté votre demande de rejoindre la base ${baseTitle}`,
    text: acceptedBaseJoinRequest.text({ adminName, baseTitle }),
    html: compileMjml(
      acceptedBaseJoinRequest.mjml({
        url,
        adminName,
        baseTitle,
      }),
    ),
  })

  throwOnSendMailFailure(result)
}
