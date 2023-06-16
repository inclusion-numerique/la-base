import sanitizeHtml from 'sanitize-html'
import z from 'zod'
import {
  contentCaptionMaxLength,
  contentTitleMaxLength,
  resourceSectionTitleMaxLength,
} from '@app/web/server/rpc/resource/utils'

export const contentEditionValues = {
  title: z
    .string({ required_error: 'Veuillez renseigner le titre' })
    .trim()
    .nonempty('Veuillez renseigner le titre')
    .max(
      resourceSectionTitleMaxLength,
      `Le titre ne doit pas dépasser ${resourceSectionTitleMaxLength} caractères`,
    ),
  text: z
    .string({ required_error: 'Veuillez renseigner le texte' })
    .trim()
    .nonempty('Veuillez renseigner le texte')
    .transform((text) => sanitizeHtml(text)),
}

export const SectionTitlePayloadCommandValidation = z.object({
  type: z.literal('SectionTitle'),
  title: contentEditionValues.title,
})
export type SectionTitlePayload = z.infer<
  typeof SectionTitlePayloadCommandValidation
>

export const TextPayloadCommandValidation = z.object({
  type: z.literal('Text'),
  text: contentEditionValues.text,
})
export type TextPayload = z.infer<typeof TextPayloadCommandValidation>

export const ImagePayloadCommandValidation = z.object({
  type: z.literal('Image'),
  imageId: z
    .string({ required_error: 'Veuillez choisir une image' })
    .uuid()
    .nonempty('Veuillez choisir une image'),
  title: z
    .string({ required_error: 'Veuillez renseigner le titre' })
    .trim()
    .nonempty('Veuillez renseigner le titre')
    .max(
      contentTitleMaxLength,
      `Le titre ne doit pas dépasser ${contentTitleMaxLength} caractères`,
    ),
  imageAltText: z
    .string()
    .trim()
    .max(
      contentCaptionMaxLength,
      `Le texte alternatif ne doit pas dépasser ${contentCaptionMaxLength} caractères`,
    )
    .nullish(),
  caption: z
    .string()
    .trim()
    .max(
      contentCaptionMaxLength,
      `La légende ne doit pas dépasser ${contentCaptionMaxLength} caractères`,
    )
    .nullish(),
})
export type ImagePayload = z.infer<typeof ImagePayloadCommandValidation>

export const LinkPayloadCommandValidation = z.object({
  type: z.literal('Link'),
  title: z
    .string({ required_error: 'Veuillez renseigner le titre' })
    .trim()
    .nonempty('Veuillez renseigner le titre')
    .max(
      contentTitleMaxLength,
      `Le titre ne doit pas dépasser ${contentTitleMaxLength} caractères`,
    ),
  url: z
    .string({ required_error: "Veuillez renseigner l'URL" })
    .trim()
    .nonempty("Veuillez renseigner l'URL")
    .url('URL non valide'),
  caption: z
    .string({ required_error: 'Veuillez renseigner la légende' })
    .trim()
    .max(
      contentCaptionMaxLength,
      `La légende ne doit pas dépasser ${contentCaptionMaxLength} caractères`,
    )
    .nullish(),
  showPreview: z.boolean().optional(),
  linkDescription: z.string().nullish(),
  linkTitle: z.string().nullish(),
  linkImageUrl: z.string().nullish(),
  linkFaviconUrl: z.string().nullish(),
})
export type LinkPayload = z.infer<typeof LinkPayloadCommandValidation>

export const FilePayloadCommandValidation = z.object({
  type: z.literal('File'),
  fileKey: z
    .string({ required_error: 'Veuillez choisir un fichier' })
    .nonempty('Veuillez choisir un fichier'),
  title: z
    .string({ required_error: 'Veuillez renseigner le titre' })
    .trim()
    .nonempty('Veuillez renseigner le titre')
    .max(
      contentTitleMaxLength,
      `Le titre ne doit pas dépasser ${contentTitleMaxLength} caractères`,
    ),
  caption: z
    .string({ required_error: 'Veuillez renseigner la légende' })
    .trim()
    .max(
      contentCaptionMaxLength,
      `La légende ne doit pas dépasser ${contentCaptionMaxLength} caractères`,
    )
    .nullish(),
})
export type FilePayload = z.infer<typeof FilePayloadCommandValidation>

export const ContentPayloadCommandValidation = z.discriminatedUnion('type', [
  SectionTitlePayloadCommandValidation,
  TextPayloadCommandValidation,
  ImagePayloadCommandValidation,
  LinkPayloadCommandValidation,
  FilePayloadCommandValidation,
])

export type ContentPayload =
  | SectionTitlePayload
  | TextPayload
  | LinkPayload
  | ImagePayload
  | FilePayload
