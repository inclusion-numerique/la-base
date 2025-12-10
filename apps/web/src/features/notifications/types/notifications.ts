import type { Notifications } from '@prisma/client'

export type NotificationWithRelations = Notifications & {
  resource?: {
    id: string
    title: string
    slug: string
  } | null
  base?: {
    id: string
    title: string
    slug: string
  } | null
  initiator?: {
    id: string
    name: string | null
    slug: string
  } | null
}
