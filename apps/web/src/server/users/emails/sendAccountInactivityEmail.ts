import { compileMjml } from '@app/emails/mjml'
import { accountDeleted } from '@app/emails/templates/accountDeleted'
import { accountDeletionSoon } from '@app/emails/templates/accountDeletionSoon'
import { accountInactive } from '@app/emails/templates/accountInactive'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'

export const sendAccountInactiveEmail = async ({
  email,
  firstname,
  url,
}: {
  email: string
  firstname: string
  url: string
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,
    subject: 'Votre compte est inactif',
    text: accountInactive.text({ firstname, email, url }),
    html: compileMjml(accountInactive.mjml({ firstname, email, url })),
  })

  throwOnSendMailFailure(result)
}

export const sendAccountDeletionSoonEmail = async ({
  email,
  firstname,
  url,
  title,
}: {
  email: string
  firstname: string
  url: string
  title: string
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,
    subject: title,
    text: accountDeletionSoon.text({ firstname, email, url }),
    html: compileMjml(
      accountDeletionSoon.mjml({ firstname, email, url, title }),
    ),
  })

  throwOnSendMailFailure(result)
}

export const sendAccountDeletedEmail = async ({
  email,
  url,
}: {
  email: string
  url: string
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,
    subject: 'Votre compte a ete supprime',
    text: accountDeleted.text({ url }),
    html: compileMjml(accountDeleted.mjml({ url })),
  })

  throwOnSendMailFailure(result)
}
