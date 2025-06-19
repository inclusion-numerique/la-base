import { resourceEditionValues } from '@app/web/server/rpc/resource/utils'
import z from 'zod'

export const EditTitleAndDescriptionCommandValidation = z.object({
  name: z.literal('EditTitleAndDescription'),
  payload: z.object({
    resourceId: z.string().uuid(),
    title: resourceEditionValues.title,
    description: resourceEditionValues.description,
  }),
})

export type EditTitleAndDescriptionCommand = z.infer<
  typeof EditTitleAndDescriptionCommandValidation
>

export type TitleAndDescriptionEditedDataV1 = {
  __version: 1
  title: string
  description: string
}

export type TitleAndDescriptionEdited = {
  type: 'TitleAndDescriptionEdited'
  timestamp: Date
  data: TitleAndDescriptionEditedDataV1
}
