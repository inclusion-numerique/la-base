import {
  AddContentCommandValidation,
  type ContentAdded,
} from '@app/web/server/resources/feature/AddContent'
import {
  applyContentAdded,
  handleAddContent,
} from '@app/web/server/resources/feature/AddContent.server'
import {
  type BaseChanged,
  ChangeBaseCommandValidation,
} from '@app/web/server/resources/feature/ChangeBase'
import {
  applyBaseChanged,
  handleChangeBase,
  onBaseChanged,
} from '@app/web/server/resources/feature/ChangeBase.server'
import {
  CreateResourceCommandValidation,
  type ResourceCreated,
} from '@app/web/server/resources/feature/CreateResource'
import {
  applyResourceCreated,
  handleCreateResource,
  onCreated,
} from '@app/web/server/resources/feature/CreateResource.server'
import {
  type ContentEdited,
  EditContentCommandValidation,
} from '@app/web/server/resources/feature/EditContent'
import {
  applyContentEdited,
  handleEditContent,
} from '@app/web/server/resources/feature/EditContent.server'
import {
  EditImageCommandValidation,
  type ImageEdited,
} from '@app/web/server/resources/feature/EditImage'
import {
  applyImageEdited,
  handleEditImage,
} from '@app/web/server/resources/feature/EditImage.server'
import {
  EditTitleAndDescriptionCommandValidation,
  type TitleAndDescriptionEdited,
} from '@app/web/server/resources/feature/EditTitleAndDescription'
import {
  applyTitleAndDescriptionEdited,
  handleEditTitleAndDescription,
} from '@app/web/server/resources/feature/EditTitleAndDescription.server'
import {
  MigrateResourceCommandValidation,
  type ResourceMigrated,
} from '@app/web/server/resources/feature/MigrateResource'
import {
  applyResourceMigrated,
  handleMigrateResource,
  onMigrated,
} from '@app/web/server/resources/feature/MigrateResource.server'
import {
  PublishCommandValidation,
  type ResourcePublished,
} from '@app/web/server/resources/feature/PublishResource'
import {
  applyResourcePublished,
  handlePublish,
  onPublished,
} from '@app/web/server/resources/feature/PublishResource.server'
import {
  type ContentRemoved,
  RemoveContentCommandValidation,
} from '@app/web/server/resources/feature/RemoveContent'
import {
  applyContentRemoved,
  handleRemoveContent,
} from '@app/web/server/resources/feature/RemoveContent.server'
import {
  type ContentReordered,
  ReorderContentCommandValidation,
} from '@app/web/server/resources/feature/ReorderContent'
import {
  applyContentReordered,
  handleReorderContent,
} from '@app/web/server/resources/feature/ReorderContent.server'
import type {
  ResourceCreationCommandHandler,
  ResourceMutationCommandHandler,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import type {
  ApplierResourceEvent,
  ResourceCreationEventApplier,
  ResourceMutationEventApplier,
} from '@app/web/server/resources/feature/ResourceEventApplier'
import type {
  ResourceEventSideEffect,
  ResourceSideEffectContext,
} from '@app/web/server/resources/feature/ResourceEventSideEffect'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import z from 'zod'

import {
  ChangeLicenceCommandValidation,
  LicenceChanged,
} from '@app/web/server/resources/feature/ResourceChangeLicence'
import {
  applyLicenceChanged,
  handleChangeLicence,
  onLicenceChanged,
} from '@app/web/server/resources/feature/ResourceChangeLicence.server'
import {
  ChangeIndexationCommandValidation,
  type IndexationChanged,
} from './ChangeIndexation'
import {
  applyIndexationChanged,
  handleChangeIndexation,
  onIndexationChanged,
} from './ChangeIndexation.server'
import {
  ChangePublicFeedbackCommandValidation,
  type PublicFeedbackChanged,
} from './ChangePublicFeedback'
import {
  applyPublicFeedbackChanged,
  handleChangePublicFeedback,
  onPublicFeedbackChanged,
} from './ChangePublicFeedback.server'
import {
  ChangeVisibilityCommandValidation,
  type VisibilityChanged,
} from './ChangeVisibility'
import {
  applyVisibilityChanged,
  handleChangeVisibility,
  onVisibilityChanged,
} from './ChangeVisibility.server'
import { DeleteCommandValidation, type ResourceDeleted } from './DeleteResource'
import {
  applyResourceDeleted,
  handleDelete,
  onDeleted,
} from './DeleteResource.server'
import {
  RepublishCommandValidation,
  type ResourceRepublished,
} from './RepublishResource'
import {
  applyResourceRepublished,
  handleRepublish,
  onRepublished,
} from './RepublishResource.server'

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
  ChangeIndexationCommandValidation,
  ChangeVisibilityCommandValidation,
  ChangeLicenceCommandValidation,
  ChangePublicFeedbackCommandValidation,
  AddContentCommandValidation,
  EditContentCommandValidation,
  ReorderContentCommandValidation,
  RemoveContentCommandValidation,
  PublishCommandValidation,
  RepublishCommandValidation,
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
  ChangeIndexation: handleChangeIndexation,
  ChangeVisibility: handleChangeVisibility,
  ChangePublicFeedback: handleChangePublicFeedback,
  ChangeLicence: handleChangeLicence,
  AddContent: handleAddContent,
  EditContent: handleEditContent,
  ReorderContent: handleReorderContent,
  RemoveContent: handleRemoveContent,
  Publish: handlePublish,
  Republish: handleRepublish,
  Delete: handleDelete,
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
  | VisibilityChanged
  | IndexationChanged
  | PublicFeedbackChanged
  | TitleAndDescriptionEdited
  | ImageEdited
  | ContentAdded
  | ContentEdited
  | ContentReordered
  | ContentRemoved
  | ResourcePublished
  | ResourceRepublished
  | ResourceDeleted
  | LicenceChanged

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
  IndexationChanged: applyIndexationChanged,
  VisibilityChanged: applyVisibilityChanged,
  LicenceChanged: applyLicenceChanged,
  PublicFeedbackChanged: applyPublicFeedbackChanged,
  Published: applyResourcePublished,
  Republished: applyResourceRepublished,
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
  BaseChanged: onBaseChanged,
  IndexationChanged: onIndexationChanged,
  VisibilityChanged: onVisibilityChanged,
  LicenceChanged: onLicenceChanged,
  PublicFeedbackChanged: onPublicFeedbackChanged,
  Republished: onRepublished,
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
