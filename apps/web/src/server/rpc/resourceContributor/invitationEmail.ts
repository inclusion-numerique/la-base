import { createTransport } from 'nodemailer'
import { compileMjml } from '@app/emails/mjml'
import { inviteContributor } from '@app/emails/templates/inviteContributor'
import { SessionUser } from '@app/web/auth/sessionUser'
import { ServerWebAppConfig } from '@app/web/webAppConfig'
import { Resource } from '../../resources/getResource'

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
  const transport = createTransport(ServerWebAppConfig.Email.server)
  const result = await transport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
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

  const failed = [...result.rejected].filter(Boolean)
  if (failed.length > 0) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}
