import { compileMjml } from '@app/emails/mjml'
import { emailSignin } from '@app/emails/templates/emailSignin'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'
import type { SendVerificationRequestParams } from 'next-auth/providers'
import { getServerUrl } from '../utils/baseUrl'

const debugMagicLink = !PublicWebAppConfig.isMain

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

  // To avoid email clients burning the link, we redirect to a "buffer" page that will redirect in client js
  const bufferUrl = new URL(
    getServerUrl('/connexion/verification/lien', {
      absolutePath: true,
    }),
  )

  // Add the base url as the "url" query param of the bufferUrl
  bufferUrl.searchParams.set('url', url)

  const finalUrl = bufferUrl.toString()

  const result = await emailTransport.sendMail({
    to: identifier,
    from: provider.from,
    replyTo: PublicWebAppConfig.contactEmail,
    subject: `Connexion à ${PublicWebAppConfig.projectTitle}`,
    text: emailSignin.text({ url: finalUrl }),
    html: compileMjml(emailSignin.mjml({ url: finalUrl })),
  })

  throwOnSendMailFailure(result)
}
