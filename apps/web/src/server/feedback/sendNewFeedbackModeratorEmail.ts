import { difficultyAreaLabels } from '@app/web/feedback/SendFeedback'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import type { Feedback } from '@prisma/client'

export const sendNewFeedbackModeratorEmail = async ({
  feedback: {
    rating,
    comment,
    created,
    difficultyArea,
    difficultyComment,
    hadDifficulty,
    wantsToBeContacted,
  },
}: {
  feedback: Feedback
}) => {
  const result = await emailTransport.sendMail({
    to: ServerWebAppConfig.ReportModerator.to,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,

    subject: `Questionnaire de satisfaction`,
    html: `
<html lang='fr'>
  <body style='font-family:Marianne, Helvetica, Arial, sans-serif;'>
    <h2 style='color:#000091;'>Questionnaire de satisfaction</h2>
    <p>Un utilisateur à envoyé un nouveau questionnaire de satisfaction.</p>
    <ul>
      <li>Date d’envoi&nbsp;: ${dateAsDayAndTime(created)}</li>
      <li>Score (0-10)&nbsp;: ${rating}</li>
      <li>Difficulté rencontrée&nbsp;: ${hadDifficulty ? 'Oui' : 'Non'}</li>
      ${
        hadDifficulty
          ? `
  <li>Domaine de difficulté&nbsp;: ${difficultyArea ? difficultyAreaLabels[difficultyArea] : 'Non renseigné'}</li>
  <li>Commentaire sur la difficulté&nbsp;: ${difficultyComment || 'Non renseigné'}</li>
`
          : ''
      }
      <li>Commentaire général&nbsp;: ${comment || 'Non renseigné'}</li>
    </ul>
    <h3>Contact</h3>
    <ul>
     <li>${wantsToBeContacted ? `L’utilisateur souhaite être contacté par email : ${wantsToBeContacted}` : `L’utilisateur ne souhaite pas être contacté`}</li>
    </ul>
  </body>
</html>
    `,
  })

  throwOnSendMailFailure(result)
}
