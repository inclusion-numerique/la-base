import { compileMjml } from '@app/emails/mjml'
import { newsFeedNewsletter } from '@app/emails/templates/newsFeedNewsletter'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'
import { NewsFeedResourceServer } from '@app/web/server/newsFeed/getNewsFeedResources'

export const sendNewsFeedNewsletterEmail = async (
  email: string,
  resources: NewsFeedResourceServer[],
) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,
    subject: 'Résumé mensuel des dernières publications lié à vos préférences.',
    text: newsFeedNewsletter.text(),
    html: compileMjml(
      newsFeedNewsletter.mjml({
        count: resources.length,
        resources,
      }),
    ),
  })

  throwOnSendMailFailure(result)
}
