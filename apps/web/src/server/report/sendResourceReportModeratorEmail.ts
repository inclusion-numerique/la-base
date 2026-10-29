import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { resourceReportReasonLabels } from '@app/web/resources/resourceReport'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import { escapeHtml } from '@app/web/utils/escapeHtml'
import type { Resource, ResourceReport, User } from '@prisma/client'

export const sendResourceReportModeratorEmail = async ({
  report,
  resource,
  sentBy,
  moderatorEmails,
}: {
  resource: Pick<Resource, 'slug' | 'title'>
  sentBy: Pick<User, 'id' | 'name' | 'email' | 'slug'> | null
  report: Pick<ResourceReport, 'created' | 'reason' | 'comment'>
  moderatorEmails: string[]
}) => {
  const resourceUrl = getServerUrl(`/ressources/${resource.slug}`)
  const reportsUrl = getServerUrl('/administration/signalements')
  const notificationsSettingsUrl = getServerUrl('/profil/notifications')

  const authorProfileUrl = sentBy
    ? getServerUrl(`/profils/${sentBy.slug}`)
    : null

  const result = await emailTransport.sendMail({
    to: ServerWebAppConfig.ReportModerator.to,
    bcc: moderatorEmails,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,

    subject: `Signalement de ressource`,
    html: `
<html lang="fr">
  <body style='font-family:Marianne, Helvetica, Arial, sans-serif;'>
    <h2 style='color:#000091;'>Signalement de ressource</h2>
    <p>Une ressource a été signalée par un utilisateur.</p>
    <ul>
      <li>Signalé le&nbsp;: ${dateAsDayAndTime(report.created)} UTC</li>
      <li>Raison&nbsp;: ${resourceReportReasonLabels[report.reason]}</li>
      <li>Description&nbsp;: ${escapeHtml(report.comment)}</li>
    </ul>
    <h3>Ressource</h3>
    <ul>
      <li>Titre&nbsp;: ${escapeHtml(resource.title)}</li>
      <li>Lien&nbsp;: <a href='${resourceUrl}'>${resourceUrl}</a></li>
    </ul>
    ${
      sentBy
        ? `
          <h3>Auteur du signalement</h3>
          <ul>
            <li>Nom&nbsp;: ${sentBy.name ? escapeHtml(sentBy.name) : 'Non renseigné'}</li>
            <li>Email&nbsp;: ${escapeHtml(sentBy.email)}</li>
            <li>Lien du profil&nbsp;: <a href='${authorProfileUrl}'>${authorProfileUrl}</a></li>
          </ul>`
        : `
          <h3>Le signalement est anonyme</h3>`
    }
    <h3>Traiter le signalement</h3>
    <p>
      Rendez-vous sur la <a href='${reportsUrl}'>page des signalements</a>.
      Si ce signalement n’y apparaît plus, il a déjà été traité par un autre modérateur.
    </p>
    <p style='font-size:12px;color:#666666;'>
      Vous recevez ce mail en tant que modérateur ou administrateur des Bases.
      Pour ne plus le recevoir, désactivez l’option dans les
      <a href='${notificationsSettingsUrl}'>notifications de votre profil</a>.
    </p>
  </body>
</html>
    `,
  })

  throwOnSendMailFailure(result)
}
