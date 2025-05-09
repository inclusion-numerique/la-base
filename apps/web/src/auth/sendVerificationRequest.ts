import { compileMjml } from '@app/emails/mjml'
import { emailSignin } from '@app/emails/templates/emailSignin'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'
import type { SendVerificationRequestParams } from 'next-auth/providers'

const debugMagicLink = true

export const sendVerificationRequest = async ({
  url,
  provider,
  identifier,
}: SendVerificationRequestParams) => {
  // For quicker dev UX, display url in console in dev environment
  if (debugMagicLink) {
    // biome-ignore lint/suspicious/noConsole: needed for troubleshooting
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
