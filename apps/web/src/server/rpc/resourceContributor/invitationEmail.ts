import { compileMjml } from '@app/emails/mjml'
import { inviteContributor } from '@app/emails/templates/inviteContributor'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'
import type { Resource } from '@app/web/server/resources/getResource'

export const sendNewContributorEmail = async ({
  url,
  email,
  from,
  resource,
}: {
  url: string
  email: string
  from: SessionUser
  resource: Resource
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,

    subject: `Invitation à contribuer à la ressource ${resource.title}`,
    text: inviteContributor.text({ resourceTitle: resource.title }),
    html: compileMjml(
      inviteContributor.mjml({
        url,
        resourceTitle: resource.title,
        from: from.name || '',
      }),
    ),
  })

  throwOnSendMailFailure(result)
}
