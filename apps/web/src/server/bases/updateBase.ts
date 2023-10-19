import z from 'zod'
import sanitizeHtml from 'sanitize-html'

export const titleValidation = z
  .string({ required_error: 'Veuillez renseigner le nom de la base' })
  .trim()
  .nonempty('Veuillez renseigner le nom de la base')
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
  .url('Veuiller renseigner une URL valide')
  .trim()
  .optional()

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

export type UpdateBaseImageCmmand = z.infer<
  typeof UpdateBaseImageCommandValidation
>
