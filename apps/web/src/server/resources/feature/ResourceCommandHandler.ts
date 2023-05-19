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

export type ResourceCommandHandlerContext = {
  user: SessionUser
}
export type ResourceCreationCommandHandler<
  Command extends ResourceCreationCommand = ResourceCreationCommand,
  Event extends ApplierResourceEvent = ApplierResourceEvent,
> = (
  command: Command,
  context: ResourceCommandHandlerContext,
) => Event | Event[] | Promise<Event | Event[]>

export type ResourceMutationCommandHandler<
  Command extends ResourceMutationCommand = ResourceMutationCommand,
  Event extends ApplierResourceEvent = ApplierResourceEvent,
> = (
  command: Command,
  context: ResourceCommandHandlerContext & {
    resource: ResourceProjection
    persistedResource: PersistedResource
  },
) => Event | Event[] | Promise<Event | Event[]>

export type ResourceCommandHandler =
  | ResourceCreationCommand
  | ResourceMutationCommandHandler

export type ResourceCommandSecurityRuleContext = {
  user: SessionUser
}

export type ResourceCommandSecurityRule<
  Command extends HandlerResourceCommand = HandlerResourceCommand,
> = (
  command: Command,
  context: ResourceCommandSecurityRuleContext,
) => Promise<boolean> | boolean
