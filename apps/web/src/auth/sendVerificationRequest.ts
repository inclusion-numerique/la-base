import { SendVerificationRequestParams } from 'next-auth/providers'
import { compileMjml } from '@app/emails/mjml'
import { emailSignin } from '@app/emails/templates/emailSignin'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'

const debugMagicLink = true

export const sendVerificationRequest = async ({
  url,
  provider,
  identifier,
}: SendVerificationRequestParams) => {
  // For quicker dev UX, display url in console in dev environment
  if (debugMagicLink) {
    // eslint-disable-next-line no-console
    console.log(`[AUTH] Magic link for ${identifier}: ${url}`)
  }

  const result = await emailTransport.sendMail({
    to: identifier,
    from: provider.from,
    replyTo: PublicWebAppConfig.contactEmail,
    subject: `Connexion à ${PublicWebAppConfig.projectTitle}`,
    text: emailSignin.text({ url }),
    html: compileMjml(emailSignin.mjml({ url })),
  })

  throwOnSendMailFailure(result)
}
