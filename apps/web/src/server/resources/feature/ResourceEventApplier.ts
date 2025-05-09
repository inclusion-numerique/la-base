import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import type { ResourceEventType } from '@prisma/client'

export type ApplierResourceEvent<
  Type extends ResourceEventType = ResourceEventType,
  Data = unknown,
> = {
  type: Type
  data: Data
  timestamp: Date
}

export type ResourceCreationEventApplier<
  Event extends ApplierResourceEvent = ApplierResourceEvent,
> = (event: Event & { timestamp: Date }) => ResourceProjection

export type ResourceMutationEventApplier<
  Event extends ApplierResourceEvent = ApplierResourceEvent,
> = (
  event: Event & { timestamp: Date },
  resource: ResourceProjection,
) => ResourceProjection
