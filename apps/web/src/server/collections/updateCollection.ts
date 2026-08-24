import { htmlToText } from '@app/web/utils/htmlToText'
import sanitizeHtml from 'sanitize-html'
import z from 'zod'
import {
  collectionDescriptionMaxLength,
  collectionTitleMaxLength,
} from './collectionConstraints'

export const collectionIdValidation = z
  .string({
    error: "Veuillez renseigner l'id de la collection",
  })
  .uuid()

export const titleValidation = z
  .string({ error: 'Veuillez renseigner le nom de la collection' })
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
  // `.optional()` après `.transform()` : en zod 4 un transform placé en dernier rend la
  // clé obligatoire en sortie alors qu'elle reste optionnelle en entrée, ce qui désaligne
  // les types input/output attendus par react-hook-form. Comportement inchangé.
  .transform((text) => (text ? sanitizeHtml(text) : text))
  .optional()

export const isPublicValidation = z.boolean({
  error: 'Veuillez spécifier la visibilité de la collection',
})

export const UpdateCollectionInformationsCommandValidation = z.object({
  id: collectionIdValidation,
  title: titleValidation,
  description: descriptionValidation,
})

export const UpdateCollectionOrdersCommandValidation = z.object({
  collections: z.array(
    z.object({
      id: collectionIdValidation,
      order: z.number(),
    }),
  ),
})

export const UpdateCollectionImageCommandValidation = z.object({
  id: collectionIdValidation,
  imageId: z.string().uuid().nullish(),
})

export const UpdateCollectionVisibilityCommandValidation = z.object({
  id: collectionIdValidation,
  isPublic: isPublicValidation,
})

export type UpdateCollectionInformationsCommand = z.infer<
  typeof UpdateCollectionInformationsCommandValidation
>

export type UpdateCollectionOrdersCommand = z.infer<
  typeof UpdateCollectionOrdersCommandValidation
>

export type UpdateCollectionImageCommand = z.infer<
  typeof UpdateCollectionImageCommandValidation
>

export type UpdateCollectionVisibilityCommand = z.infer<
  typeof UpdateCollectionVisibilityCommandValidation
>
