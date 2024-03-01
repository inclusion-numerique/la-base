import { SessionUser } from '@app/web/auth/sessionUser'
import { PersistedResource } from '@app/web/server/resources/feature/PersistedResource'
import { ApplierResourceEvent } from '@app/web/server/resources/feature/ResourceEventApplier'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import type {
  ResourceCreationCommand,
  ResourceMutationCommand,
} from '@app/web/server/resources/feature/features'

export type HandlerResourceCommand<
  Name extends string = string,
  Payload = unknown,
> = {
  name: Name
  payload: Payload
}

export type ResourceCreationCommandHandlerContext = {
  user?: Pick<SessionUser, 'id'>
}
export type ResourceCreationCommandHandler<
  Command extends ResourceCreationCommand = ResourceCreationCommand,
  Event extends ApplierResourceEvent = ApplierResourceEvent,
> = (
  command: Command,
  context: ResourceCreationCommandHandlerContext,
) => Event | Event[] | Promise<Event | Event[]>

export type ResourceMutationCommandHandlerContext = {
  user?: Pick<SessionUser, 'id'>
  resource: ResourceProjection
  persistedResource: PersistedResource
}
export type ResourceMutationCommandHandler<
  Command extends ResourceMutationCommand = ResourceMutationCommand,
  Event extends ApplierResourceEvent = ApplierResourceEvent,
> = (
  command: Command,
  context: ResourceMutationCommandHandlerContext,
) => Event | Event[] | Promise<Event | Event[]>

export type ResourceCommandHandler =
  | ResourceCreationCommand
  | ResourceMutationCommandHandler
