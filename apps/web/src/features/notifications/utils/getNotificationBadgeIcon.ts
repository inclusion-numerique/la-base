import { NotificationWithRelations } from '@app/web/features/notifications/types/notifications'

const NOTIFICATION_BADGE_ICONS = {
  ResourceFeedback: 'ri-emotion-fill',
  ReportedResource: 'ri-alert-fill',
  ResourceModification: 'ri-edit-fill',
  ResourceDeletion: 'ri-delete-bin-fill',
  ResourceComment: 'ri-discuss-fill',
  AcceptedBaseInvitation: 'ri-user-add-fill',
  DeclinedBaseInvitation: 'ri-close-circle-fill',
  BaseRoleChange: 'ri-user-settings-fill',
  BaseMemberDeletion: 'ri-user-minus-fill',
  BaseDeletion: 'ri-delete-bin-fill',
  AskJoinBase: 'ri-user-add-fill',
  AcceptedAskJoinBase: 'ri-user-add-fill',
  DeclinedAskJoinBase: 'ri-close-circle-fill',
  ResourcePublication: 'ri-article-fill',
} as const

export const getNotificationBadgeIcon = (
  notification: NotificationWithRelations,
) => {
  return NOTIFICATION_BADGE_ICONS[notification.type]
}
