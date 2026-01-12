import type { Image, Notification } from '@prisma/client'

export type NotificationWithRelations = Notification & {
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
    firstName: string | null
    lastName: string | null
    image: Image | null
  } | null
}
