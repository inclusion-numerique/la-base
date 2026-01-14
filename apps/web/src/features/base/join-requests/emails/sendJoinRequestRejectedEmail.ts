import { compileMjml } from '@app/emails/mjml'
import { rejectedBaseJoinRequest } from '@app/emails/templates/rejectedBaseJoinRequest'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'

export const sendJoinRequestRejectedEmail = async ({
  email,
  baseTitle,
  adminName,
}: {
  email: string
  baseTitle: string
  adminName: string
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,
    subject: `${adminName} a refusé votre demande de rejoindre la base ${baseTitle}`,
    text: rejectedBaseJoinRequest.text({ adminName, baseTitle }),
    html: compileMjml(
      rejectedBaseJoinRequest.mjml({
        adminName,
        baseTitle,
      }),
    ),
  })

  throwOnSendMailFailure(result)
}
