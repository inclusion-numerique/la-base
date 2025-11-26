import { compileMjml } from '@app/emails/mjml'
import { reportedResourceModeration } from '@app/emails/templates/reportedResourceModeration'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'
import type { User } from '@prisma/client'

export const sendResourceModerationEmail = async ({
  resourceName,
  resourceCreator,
  moderatorName,
  moderatorEmail,
}: {
  resourceName: string
  resourceCreator: Pick<User, 'name' | 'email' | 'deleted'>
  moderatorName: string
  moderatorEmail: string
}) => {
  // Do not send email to deleted users
  if (resourceCreator.deleted) {
    return
  }
  const creatorName = resourceCreator.name || 'Utilisateur'

  const result = await emailTransport.sendMail({
    to: resourceCreator.email,
    from: ServerWebAppConfig.Email.from,
    replyTo: moderatorEmail,
    subject: 'Notification de signalement et suppression de ressource',
    text: reportedResourceModeration.text({
      resourceName,
      creatorName,
      moderatorName,
      moderatorEmail,
    }),
    html: compileMjml(
      reportedResourceModeration.mjml({
        resourceName,
        creatorName,
        moderatorName,
        moderatorEmail,
      }),
    ),
  })

  throwOnSendMailFailure(result)
}
