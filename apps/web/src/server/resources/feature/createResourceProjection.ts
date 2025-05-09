import type {
  ResourceCreationEventApplier,
  ResourceMutationEventApplier,
} from '@app/web/server/resources/feature/ResourceEventApplier'
import {
  CreationEventAppliers,
  type CreationHistoryResourceEvent,
  type HistoryEventsForResource,
  MutationEventAppliers,
  type MutationHistoryResourceEvent,
} from '@app/web/server/resources/feature/features'
import type {
  Resource,
  ResourceContent,
} from '@app/web/server/resources/getResource'

/**
 * Resource reconstructed from event does not include relations, but only their ids
 */

export type ContentProjection = Omit<ResourceContent, 'image' | 'file'>

export type ResourceProjection = Omit<
  Resource,
  'contents' | 'createdBy' | 'base' | 'image'
> & { contents: ContentProjection[] }

export const applyMutationEvent = (
  event: MutationHistoryResourceEvent,
  resource: ResourceProjection,
): ResourceProjection => {
  const mutationApplier = MutationEventAppliers[event.type] as
    | ResourceMutationEventApplier
    | undefined
  if (!mutationApplier) {
    throw new Error(`Unknown mutation event type: "${event.type}"`)
  }

  return mutationApplier(event, resource)
}

export const updateResourceProjection = (
  resource: ResourceProjection,
  mutationEvents: MutationHistoryResourceEvent[],
): ResourceProjection => {
  let updated = resource
  for (const event of mutationEvents) {
    updated = applyMutationEvent(event, updated)
  }

  return updated
}

export const applyCreationEvent = (
  event: CreationHistoryResourceEvent,
): ResourceProjection => {
  const creationApplier = CreationEventAppliers[event.type] as
    | ResourceCreationEventApplier
    | undefined
  if (!creationApplier) {
    throw new Error(`Unknown creation event type: "${event.type}"`)
  }

  return creationApplier(event)
}

export const createResourceProjection = ([
  creationEvent,
  ...mutationEvents
]: HistoryEventsForResource): ResourceProjection => {
  if (!creationEvent) {
    throw new Error('No creation event found')
  }
  const resource = applyCreationEvent(creationEvent)

  return updateResourceProjection(resource, mutationEvents)
}
