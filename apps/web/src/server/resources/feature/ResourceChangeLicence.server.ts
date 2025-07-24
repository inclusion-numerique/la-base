import {
  ChangeLicenceCommand,
  LicenceChanged,
} from '@app/web/server/resources/feature/ResourceChangeLicence'
import { ResourceMutationCommandHandler } from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import { ResourceEventSideEffect } from '@app/web/server/resources/feature/ResourceEventSideEffect'

export const handleChangeLicence: ResourceMutationCommandHandler<
  ChangeLicenceCommand,
  LicenceChanged
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'LicenceChanged',
  timestamp: new Date(),
  data: {
    __version: 1,
    ...rest,
  },
})

export const applyLicenceChanged: ResourceMutationEventApplier<
  LicenceChanged
> = ({ data: { __version, ...rest } }, resource) => ({
  ...resource,
  ...rest,
})

export const onLicenceChanged: ResourceEventSideEffect<LicenceChanged> = async (
  { data: { __version, ...rest } },
  resource,
  { transaction },
) => {
  await transaction.resource.update({
    where: { id: resource.id },
    data: rest,
  })
}
