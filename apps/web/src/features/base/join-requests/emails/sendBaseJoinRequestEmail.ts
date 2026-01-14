import { compileMjml } from '@app/emails/mjml'
import { baseJoinRequest } from '@app/emails/templates/baseJoinRequest'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'

export const sendBaseJoinRequestEmail = async ({
  url,
  email,
  baseTitle,
  applicant,
  profileUrl,
}: {
  url: string
  email: string
  baseTitle: string
  profileUrl: string
  applicant: {
    name?: string
    firstName?: string
    lastName?: string
    email: string
    slug: string
  }
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,
    subject: `${
      applicant.firstName && applicant.lastName
        ? `${applicant.firstName} ${applicant.lastName}`
        : applicant.name || applicant.email
    } demande à rejoindre la base ${baseTitle}`,
    text: baseJoinRequest.text({ url, baseTitle, applicant }),
    html: compileMjml(
      baseJoinRequest.mjml({
        url,
        baseTitle,
        applicant,
        profileUrl,
      }),
    ),
  })

  throwOnSendMailFailure(result)
}
