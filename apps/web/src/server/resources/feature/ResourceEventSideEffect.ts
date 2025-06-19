import type { PersistedResource } from '@app/web/server/resources/feature/PersistedResource'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import type { HistoryResourceEvent } from '@app/web/server/resources/feature/features'
import type { PrismaTransaction } from '@app/web/utils/prismaTypes'

export type ResourceSideEffectContext = {
  transaction: PrismaTransaction
  persistedResource?: PersistedResource
}
export type ResourceEventSideEffect<
  Event extends HistoryResourceEvent = HistoryResourceEvent,
> = (
  event: Event,
  resource: ResourceProjection,
  context: ResourceSideEffectContext,
) => void | Promise<void>
