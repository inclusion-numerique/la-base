import type { NotificationWithRelations } from '@app/web/features/notifications/types/notifications'
import { formatName } from '@app/web/server/rpc/user/formatName'
import Link from 'next/link'

const NOTIFICATION_TEXTS = {
  ResourceFeedback: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;a ajouté un avis sur votre ressource&nbsp;
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/ressources/${notification.resource?.slug}`}
      >
        {notification.resource?.title}
      </Link>
    </>
  ),
  ReportedResource: (notification: NotificationWithRelations) => (
    <>
      Suite à un signalement, votre ressource&nbsp;
      <span className="fr-text--bold">{notification.resource?.title}</span>
      &nbsp;a été supprimée
    </>
  ),
  ResourceModification: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;a publié une modification sur{' '}
      {notification.base ? 'la ressource' : 'votre ressource'}&nbsp;
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/ressources/${notification.resource?.slug}`}
      >
        {notification.resource?.title}
      </Link>
    </>
  ),
  ResourceDeletion: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;a supprimé votre ressource&nbsp;
      <span className="fr-text--bold">{notification.resource?.title}</span>
    </>
  ),
  ResourcePublication: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;a publié la ressource&nbsp;
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/ressources/${notification.resource?.slug}`}
      >
        {notification.resource?.title}
      </Link>
      {notification.base && (
        <>
          &nbsp;dans la base&nbsp;
          <Link
            className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
            href={`/bases/${notification.base?.slug}`}
          >
            {notification.base?.title}
          </Link>
        </>
      )}
    </>
  ),
  ResourceComment: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;a répondu à votre commentaire sur la ressource&nbsp;
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/ressources/${notification.resource?.slug}`}
      >
        {notification.resource?.title}
      </Link>
    </>
  ),
  AcceptedBaseInvitation: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;a accepté votre invitation à rejoindre la base&nbsp;
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/bases/${notification.base?.slug}`}
      >
        {notification.base?.title}
      </Link>
    </>
  ),
  DeclinedBaseInvitation: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;a refusé votre invitation à rejoindre la base&nbsp;
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/bases/${notification.base?.slug}`}
      >
        {notification.base?.title}
      </Link>
    </>
  ),
  BaseRoleChange: (notification: NotificationWithRelations) => {
    const newRole = notification.isBaseNewRoleAdmin
      ? 'administrateur'
      : 'contributeur'
    return (
      <>
        <Link
          className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
          href={`/profils/${notification.initiator?.slug}`}
        >
          {formatName(notification.initiator?.name || '')}
        </Link>
        &nbsp;a changé votre rôle en {newRole} dans la base&nbsp;
        <Link
          className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
          href={`/bases/${notification.base?.slug}`}
        >
          {notification.base?.title}
        </Link>
      </>
    )
  },
  BaseMemberDeletion: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;vous a retiré de la base&nbsp;
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/bases/${notification.base?.slug}`}
      >
        {notification.base?.title}
      </Link>
    </>
  ),
  BaseDeletion: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;a supprimé la base&nbsp;
      <span className="fr-text--bold">{notification.base?.title}</span>
    </>
  ),
  AskJoinBase: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;a demandé à rejoindre votre base&nbsp;
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/bases/${notification.base?.slug}`}
      >
        {notification.base?.title}
      </Link>
    </>
  ),
  AcceptedAskJoinBase: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;a accepté votre demande de rejoindre la base&nbsp;
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/bases/${notification.base?.slug}`}
      >
        {notification.base?.title}
      </Link>
    </>
  ),
  DeclinedAskJoinBase: (notification: NotificationWithRelations) => (
    <>
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/profils/${notification.initiator?.slug}`}
      >
        {formatName(notification.initiator?.name || '')}
      </Link>
      &nbsp;a refusé votre demande de rejoindre la base&nbsp;
      <Link
        className="fr-link fr-text--sm fr-text-decoration--none fr-link--underline-on-hover"
        href={`/bases/${notification.base?.slug}`}
      >
        {notification.base?.title}
      </Link>
    </>
  ),
} as const

export const getNotificationText = (
  notification: NotificationWithRelations,
) => {
  const textGenerator = NOTIFICATION_TEXTS[notification.type]

  if (!textGenerator) {
    return null
  }

  return textGenerator(notification)
}

export type { NotificationWithRelations }
