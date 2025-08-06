import type { BaseFollowedByData } from '@app/web/server/bases/getBase'

export type BaseMetadataData = {
  _count: {
    followedBy: number
    resources: number
    resourcesViews: number
  }
  followedByData: BaseFollowedByData | null
  isPublic: boolean
  department: string | null
}
