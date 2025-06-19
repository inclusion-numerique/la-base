import type { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import type { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import type {
  ChangePublicFeedbackCommand,
  PublicFeedbackChanged,
} from './ChangePublicFeedback'
import type { ResourceEventSideEffect } from './ResourceEventSideEffect'

export const handleChangePublicFeedback: ResourceMutationCommandHandler<
  ChangePublicFeedbackCommand,
  PublicFeedbackChanged
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'PublicFeedbackChanged',
  timestamp: new Date(),
  data: {
    __version: 1,
    ...rest,
  },
})

export const applyPublicFeedbackChanged: ResourceMutationEventApplier<
  PublicFeedbackChanged
> = ({ data: { __version, ...rest } }, resource) => ({
  ...resource,
  ...rest,
})

export const onPublicFeedbackChanged: ResourceEventSideEffect<
  PublicFeedbackChanged
> = async ({ data: { __version, ...rest } }, resource, { transaction }) => {
  await transaction.resource.update({
    where: { id: resource.id },
    data: rest,
  })
}
