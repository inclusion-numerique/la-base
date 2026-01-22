import { NotificationWithRelations } from '@app/web/features/notifications/types/notifications'

export const getNotificationRedirectionUrl = (
  notification: NotificationWithRelations,
): string => {
  switch (notification.type) {
    case 'ResourceFeedback':
    case 'ResourceComment':
      return `/ressources/${notification.resource?.slug}/avis`
    case 'ReportedResource':
      return '/charte'
    case 'ResourceModification':
      return `/ressources/${notification.resource?.slug}`
    case 'AcceptedBaseInvitation':
    case 'BaseRoleChange':
      return `/bases/${notification.base?.slug}/membres`
    case 'AskJoinBase':
    case 'DeclinedAskJoinBase':
      return `/profils/${notification.initiator?.slug}`
    case 'AcceptedAskJoinBase':
      return `/bases/${notification.base?.slug}/membres`
    case 'ResourcePublication':
      return `/ressources/${notification.resource?.slug}`
    default:
      return `/profils/${notification.initiator?.slug}`
  }
}
