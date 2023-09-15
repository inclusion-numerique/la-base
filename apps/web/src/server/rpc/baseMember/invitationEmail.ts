import { createTransport } from 'nodemailer'
import { compileMjml } from '@app/emails/mjml'
import { inviteMember } from '@app/emails/templates/inviteMember'
import { SessionUser } from '@app/web/auth/sessionUser'
import { ServerWebAppConfig } from '@app/web/webAppConfig'
import { BasePageData } from '../../bases/getBase'

export const sendInviteMemberEmail = async ({
  url,
  email,
  base,
  from,
}: {
  url: string
  email: string
  base: BasePageData
  from: SessionUser
}) => {
  const transport = createTransport(ServerWebAppConfig.Email.server)
  const result = await transport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    subject: `Invitation à rejoindre la base ${base.title}`,
    text: inviteMember.text({ url, baseTitle: base.title }),
    html: compileMjml(
      inviteMember.mjml({ url, baseTitle: base.title, from: from.name || '' }),
    ),
  })

  const failed = [...result.rejected].filter(Boolean)
  if (failed.length > 0) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}
