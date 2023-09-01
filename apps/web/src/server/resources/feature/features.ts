import z from 'zod'
import {
  AddContentCommandValidation,
  ContentAdded,
} from '@app/web/server/resources/feature/AddContent'
import {
  addContentSecurityRules,
  applyContentAdded,
  handleAddContent,
} from '@app/web/server/resources/feature/AddContent.server'
import {
  BaseChanged,
  ChangeBaseCommandValidation,
} from '@app/web/server/resources/feature/ChangeBase'
import {
  applyBaseChanged,
  changeBaseSecurityRules,
  handleChangeBase,
} from '@app/web/server/resources/feature/ChangeBase.server'
import {
  CreateResourceCommandValidation,
  ResourceCreated,
} from '@app/web/server/resources/feature/CreateResource'
import {
  applyResourceCreated,
  createResourceSecurityRules,
  handleCreateResource,
  onCreated,
} from '@app/web/server/resources/feature/CreateResource.server'
import {
  ContentEdited,
  EditContentCommandValidation,
} from '@app/web/server/resources/feature/EditContent'
import {
  applyContentEdited,
  editContentSecurityRules,
  handleEditContent,
} from '@app/web/server/resources/feature/EditContent.server'
import {
  EditImageCommandValidation,
  ImageEdited,
} from '@app/web/server/resources/feature/EditImage'
import {
  applyImageEdited,
  editImageSecurityRules,
  handleEditImage,
} from '@app/web/server/resources/feature/EditImage.server'
import {
  EditTitleAndDescriptionCommandValidation,
  TitleAndDescriptionEdited,
} from '@app/web/server/resources/feature/EditTitleAndDescription'
import {
  applyTitleAndDescriptionEdited,
  editTitleAndDescriptionSecurityRules,
  handleEditTitleAndDescription,
} from '@app/web/server/resources/feature/EditTitleAndDescription.server'
import {
  MigrateResourceCommandValidation,
  ResourceMigrated,
} from '@app/web/server/resources/feature/MigrateResource'
import {
  applyResourceMigrated,
  handleMigrateResource,
  migrateResourceSecurityRules,
  onMigrated,
} from '@app/web/server/resources/feature/MigrateResource.server'
import {
  PublishCommandValidation,
  ResourcePublished,
} from '@app/web/server/resources/feature/PublishResource'
import {
  applyResourcePublished,
  handlePublish,
  onPublished,
  publishSecurityRules,
} from '@app/web/server/resources/feature/PublishResource.server'
import {
  ContentRemoved,
  RemoveContentCommandValidation,
} from '@app/web/server/resources/feature/RemoveContent'
import {
  applyContentRemoved,
  handleRemoveContent,
  removeContentSecurityRules,
} from '@app/web/server/resources/feature/RemoveContent.server'
import {
  ContentReordered,
  ReorderContentCommandValidation,
} from '@app/web/server/resources/feature/ReorderContent'
import {
  applyContentReordered,
  handleReorderContent,
  reorderContentSecurityRules,
} from '@app/web/server/resources/feature/ReorderContent.server'
import {
  ResourceCommandSecurityRule,
  ResourceCreationCommandHandler,
  ResourceMutationCommandHandler,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import {
  ApplierResourceEvent,
  ResourceCreationEventApplier,
  ResourceMutationEventApplier,
} from '@app/web/server/resources/feature/ResourceEventApplier'
import {
  ResourceEventSideEffect,
  ResourceSideEffectContext,
} from '@app/web/server/resources/feature/ResourceEventSideEffect'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { DeleteCommandValidation, ResourceDeleted } from './DeleteResource'
import {
  applyResourceDeleted,
  deleteSecurityRules,
  handleDelete,
  onDeleted,
} from './DeleteResource.server'

/**
 * This module exports all the commands that can be applied to a resource and their handlers.
 * It exports all the security rules that can be applied to the commands.
 * It also exports all the events that can be emitted by the command handlers and their appliers.
 */

export const ResourceCreationCommandsValidation = z.discriminatedUnion('name', [
  CreateResourceCommandValidation,
  MigrateResourceCommandValidation,
])
export const ResourceMutationCommandsValidation = z.discriminatedUnion('name', [
  EditTitleAndDescriptionCommandValidation,
  EditImageCommandValidation,
  ChangeBaseCommandValidation,
  AddContentCommandValidation,
  EditContentCommandValidation,
  ReorderContentCommandValidation,
  RemoveContentCommandValidation,
  PublishCommandValidation,
  DeleteCommandValidation,
])

export type ResourceCreationCommand = z.infer<
  typeof ResourceCreationCommandsValidation
>
export type ResourceMutationCommand = z.infer<
  typeof ResourceMutationCommandsValidation
>
export type ResourceCommand = ResourceCreationCommand | ResourceMutationCommand

export const ResourceCreationCommandHandlers: {
  [Name in ResourceCreationCommand['name']]: ResourceCreationCommandHandler<
    ResourceCreationCommand & { name: Name },
    ApplierResourceEvent
  >
} = {
  CreateResource: handleCreateResource,
  MigrateResource: handleMigrateResource,
}
export const ResourceMutationCommandHandlers: {
  [Name in ResourceMutationCommand['name']]: ResourceMutationCommandHandler<
    ResourceMutationCommand & { name: Name },
    ApplierResourceEvent
  >
} = {
  EditTitleAndDescription: handleEditTitleAndDescription,
  EditImage: handleEditImage,
  ChangeBase: handleChangeBase,
  AddContent: handleAddContent,
  EditContent: handleEditContent,
  ReorderContent: handleReorderContent,
  RemoveContent: handleRemoveContent,
  Publish: handlePublish,
  Delete: handleDelete,
}

export const ResourceCommandSecurityRules: {
  [Name in ResourceCommand['name']]: ResourceCommandSecurityRule<
    ResourceCommand & { name: Name }
  >
} = {
  CreateResource: createResourceSecurityRules,
  MigrateResource: migrateResourceSecurityRules,
  EditTitleAndDescription: editTitleAndDescriptionSecurityRules,
  EditImage: editImageSecurityRules,
  ChangeBase: changeBaseSecurityRules,
  AddContent: addContentSecurityRules,
  EditContent: editContentSecurityRules,
  ReorderContent: reorderContentSecurityRules,
  RemoveContent: removeContentSecurityRules,
  Publish: publishSecurityRules,
  Delete: deleteSecurityRules,
}

/**
 * All the events that could have been emitted by the command handler over time.
 * Old versions of the events are kept for immutability of the event store.
 * For each typt of event there can be multiple versions.
 */
export type HistoryResourceEvent =
  | ResourceCreated
  | ResourceMigrated
  | BaseChanged
  | TitleAndDescriptionEdited
  | ImageEdited
  | ContentAdded
  | ContentEdited
  | ContentReordered
  | ContentRemoved
  | ResourcePublished
  | ResourceDeleted

export type CreationHistoryResourceEvent = ResourceCreated | ResourceMigrated
export type MutationHistoryResourceEvent = Exclude<
  HistoryResourceEvent,
  CreationHistoryResourceEvent
>
export type HistoryEventsForResource = [
  CreationHistoryResourceEvent,
  ...MutationHistoryResourceEvent[],
]

export const CreationEventAppliers: {
  [Type in CreationHistoryResourceEvent['type']]: ResourceCreationEventApplier<
    CreationHistoryResourceEvent & { type: Type }
  >
} = {
  Created: applyResourceCreated,
  Migrated: applyResourceMigrated,
}

export const MutationEventAppliers: {
  [Type in MutationHistoryResourceEvent['type']]: ResourceMutationEventApplier<
    MutationHistoryResourceEvent & { type: Type }
  >
} = {
  TitleAndDescriptionEdited: applyTitleAndDescriptionEdited,
  ImageEdited: applyImageEdited,
  ContentAdded: applyContentAdded,
  ContentEdited: applyContentEdited,
  ContentReordered: applyContentReordered,
  ContentRemoved: applyContentRemoved,
  BaseChanged: applyBaseChanged,
  Published: applyResourcePublished,
  Deleted: applyResourceDeleted,
}

export const EventSideEffects: {
  [Type in HistoryResourceEvent['type']]?: ResourceEventSideEffect<
    HistoryResourceEvent & { type: Type }
  >
} = {
  Created: onCreated,
  Migrated: onMigrated,
  Published: onPublished,
  Deleted: onDeleted,
}

export const executeSideEffect = <Event extends HistoryResourceEvent>(
  event: Event,
  resource: ResourceProjection,
  context: ResourceSideEffectContext,
) => {
  const sideEffect = EventSideEffects[event.type] as
    | ResourceEventSideEffect<Event>
    | undefined

  if (!sideEffect) {
    return Promise.resolve()
  }
  return sideEffect(event, resource, context)
}
