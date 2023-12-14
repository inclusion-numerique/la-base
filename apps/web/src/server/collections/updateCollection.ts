import z from 'zod'
import sanitizeHtml from 'sanitize-html'
import { htmlToText } from '@app/web/utils/htmlToText'
import {
  collectionDescriptionMaxLength,
  collectionTitleMaxLength,
} from './collectionConstraints'

export const titleValidation = z
  .string({ required_error: 'Veuillez renseigner le nom de la collection' })
  .trim()
  .min(1, 'Veuillez renseigner le nom de la collection')
  .max(
    collectionTitleMaxLength,
    `Le titre ne doit pas dépasser ${collectionTitleMaxLength} caractères`,
  )

export const descriptionValidation = z
  .string()
  .trim()
  .refine(
    (text) =>
      !text || htmlToText(text).length <= collectionDescriptionMaxLength,
    {
      message: `La description ne doit pas dépasser ${collectionDescriptionMaxLength} caractères`,
    },
  )
  .optional()
  .transform((text) => (text ? sanitizeHtml(text) : text))

export const isPublicValidation = z.boolean({
  required_error: 'Veuillez spécifier la visibilité de la collection',
})

export const UpdateCollectionInformationsCommandValidation = z.object({
  id: z.string({ required_error: "Veuillez renseigner l'id de la collection" }),
  title: titleValidation,
  description: descriptionValidation,
})

export type UpdateCollectionInformationsCommand = z.infer<
  typeof UpdateCollectionInformationsCommandValidation
>
