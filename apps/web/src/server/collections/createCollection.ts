import z from 'zod'
import {
  descriptionValidation,
  isPublicValidation,
  titleValidation,
} from './updateCollection'

export const CreateCollectionCommandValidation = z.object({
  title: titleValidation,
  description: descriptionValidation,
  imageId: z.string().uuid().nullish(),
  baseId: z.string().uuid().nullish(),
  isPublic: isPublicValidation,
  // Resource to add to the collection upon creation
  addResourceId: z.string().uuid().nullish(),
  // Shareable link ID to associate with the resource
  addResourceShareableLinkId: z.string().uuid().nullish(),
})

export type CreateCollectionCommand = z.infer<
  typeof CreateCollectionCommandValidation
>
