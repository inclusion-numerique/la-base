import { resourceEditionValues } from '@app/web/server/rpc/resource/utils'
import z from 'zod'

export const CreateResourceCommandClientPayloadValidation = z.object({
  title: resourceEditionValues.title,
  description: resourceEditionValues.description,
  baseId: resourceEditionValues.baseId,
})
export type CreateResourceCommandClientPayload = z.infer<
  typeof CreateResourceCommandClientPayloadValidation
>
export const CreateResourceCommandPayloadValidation =
  CreateResourceCommandClientPayloadValidation.extend({
    resourceId: z.string().uuid(),
  })
export const CreateResourceCommandValidation = z.object({
  name: z.literal('CreateResource'),
  payload: CreateResourceCommandPayloadValidation,
})

// Without the id, used for api input validation
export const CreateResourceCommandClientValidation =
  CreateResourceCommandValidation.pick({ name: true }).extend({
    payload: CreateResourceCommandClientPayloadValidation,
  })

export type CreateResourceCommand = z.infer<
  typeof CreateResourceCommandValidation
>

export type ResourceCreatedDataV1 = {
  __version: 1
  id: string
  title: string
  slug: string
  titleDuplicationCheckSlug: string
  description: string
  baseId: string | null
  byId: string
}

// If we want to add a new version, we can add a new type here ResourceCreatedV1 | ResourceCreatedV2
export type ResourceCreated = {
  type: 'Created'
  timestamp: Date
  data: ResourceCreatedDataV1
}
