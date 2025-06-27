import { compileMjml } from '@app/emails/mjml'
import { removeBaseMember } from '@app/emails/templates/removeBaseMember'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'

export const sendRemoveBaseMemberEmail = async ({
  email,
  baseTitle,
  userRemovingName,
}: {
  email: string
  baseTitle: string
  userRemovingName: string
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,

    subject: `Vous n'êtes plus membre de la base ${baseTitle}`,
    text: removeBaseMember.text({ baseTitle }),
    html: compileMjml(
      removeBaseMember.mjml({
        userRemovingName,
        baseTitle,
      }),
    ),
  })

  throwOnSendMailFailure(result)
}
