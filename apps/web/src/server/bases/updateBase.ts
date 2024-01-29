import z from 'zod'
import sanitizeHtml from 'sanitize-html'
import { resourceTitleMaxLength } from '@app/web/server/rpc/resource/utils'

export const baseTitleMaxLength = 100

export const baseTitleInfoText = (title?: string | null) =>
  `${title?.length ?? 0}/${resourceTitleMaxLength} caractères`

export const titleValidation = z
  .string({ required_error: 'Veuillez renseigner le nom de la base' })
  .trim()
  .nonempty('Veuillez renseigner le nom de la base')
  .max(
    baseTitleMaxLength,
    'Le nom de la base ne peut pas dépasser 100 caractères',
  )
export const departmentValidation = z.string().trim().optional()
export const descriptionValidation = z
  .string()
  .trim()
  .optional()
  .transform((text) => (text ? sanitizeHtml(text) : text))

export const isPublicValidation = z.boolean({
  required_error: 'Veuillez spécifier la visibilité de la base',
})
export const emailValidation = z
  .string({ required_error: 'Veuillez renseigner une adresse e-mail' })
  .email('Veuillez entrer une adresse e-mail valide')
  .toLowerCase()
  .trim()
  .nonempty('Veuillez renseigner une adresse e-mail')
export const emailIsPublicValidation = z.boolean()
export const siteValidation = z
  .string()
  .trim()
  .url('Veuillez renseigner une URL valide')
  // Accept empty string
  .or(z.literal(''))
  // Empty string -> null
  .transform((url) => url || null)
  .nullish()

export const UpdateBaseInformationsCommandValidation = z.object({
  title: titleValidation,
  department: departmentValidation,
  description: descriptionValidation,
})

export const UpdateBaseVisibilityCommandValidation = z.object({
  isPublic: isPublicValidation,
})

export const UpdateBaseContactsCommandValidation = z.object({
  email: emailValidation,
  emailIsPublic: emailIsPublicValidation,
  website: siteValidation,
  facebook: siteValidation,
  twitter: siteValidation,
  linkedin: siteValidation,
})

export const UpdateBaseCommandValidation = z.object({
  id: z.string({ required_error: "Veuillez renseigner l'id de la base" }),
  data: z.union([
    UpdateBaseInformationsCommandValidation,
    UpdateBaseVisibilityCommandValidation,
    UpdateBaseContactsCommandValidation,
  ]),
})

export type UpdateBaseInformationsCommand = z.infer<
  typeof UpdateBaseInformationsCommandValidation
>

export type UpdateBaseVisibilityCommand = z.infer<
  typeof UpdateBaseVisibilityCommandValidation
>

export type UpdateBaseContactsCommand = z.infer<
  typeof UpdateBaseContactsCommandValidation
>

export type UpdateBaseCommand =
  | UpdateBaseInformationsCommand
  | UpdateBaseVisibilityCommand
  | UpdateBaseContactsCommand

export const UpdateBaseImageCommandValidation = z.object({
  id: z.string({ required_error: "Veuillez renseigner l'id de la base" }),
  imageId: z.string().uuid().nullable().optional(),
  coverImageId: z.string().uuid().nullable().optional(),
})

export type UpdateBaseImageCommand = z.infer<
  typeof UpdateBaseImageCommandValidation
>
