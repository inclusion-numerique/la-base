import sanitizeHtml from 'sanitize-html'
import z from 'zod'
import {
  linkCaptionMaxLength,
  linkTitleMaxLength,
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

const SectionTitlePayloadCommandValidation = z.object({
  type: z.literal('SectionTitle'),
  title: contentEditionValues.title,
})
export type SectionTitlePayload = z.infer<
  typeof SectionTitlePayloadCommandValidation
>

const TextPayloadCommandValidation = z.object({
  type: z.literal('Text'),
  text: contentEditionValues.text,
})
export type TextPayload = z.infer<typeof TextPayloadCommandValidation>

const ImagePayloadCommandValidation = z.object({
  type: z.literal('Image'),
})
export type ImagePayload = z.infer<typeof ImagePayloadCommandValidation>

const LinkPayloadCommandValidation = z.object({
  type: z.literal('Link'),
  title: z
    .string({ required_error: 'Veuillez renseigner le titre' })
    .trim()
    .nonempty('Veuillez renseigner le titre')
    .max(
      linkTitleMaxLength,
      `Le titre ne doit pas dépasser ${linkTitleMaxLength} caractères`,
    ),
  url: z
    .string({ required_error: "Veuillez renseigner l'URL" })
    .trim()
    .nonempty("Veuillez renseigner l'URL")
    .url('URL non valide'),
  caption: z
    .string({ required_error: 'Veuillez renseigner la légende' })
    .trim()
    .nonempty('Veuillez renseigner la légende')
    .max(
      linkCaptionMaxLength,
      `La légende ne doit pas dépasser ${linkCaptionMaxLength} caractères`,
    ),
  showPreview: z.boolean().optional(),
  linkDescription: z.string().nullish(),
  linkTitle: z.string().nullish(),
  linkImageUrl: z.string().nullish(),
  linkFaviconUrl: z.string().nullish(),
})
export type LinkPayload = z.infer<typeof LinkPayloadCommandValidation>

const ResourceLinkPayloadCommandValidation = z.object({
  type: z.literal('ResourceLink'),
})
export type ResourceLinkPayload = z.infer<
  typeof ResourceLinkPayloadCommandValidation
>

const FilePayloadCommandValidation = z.object({
  type: z.literal('File'),
})
export type FilePayload = z.infer<typeof FilePayloadCommandValidation>

export const ContentPayloadCommandValidation = z.discriminatedUnion('type', [
  SectionTitlePayloadCommandValidation,
  TextPayloadCommandValidation,
  ImagePayloadCommandValidation,
  LinkPayloadCommandValidation,
  ResourceLinkPayloadCommandValidation,
  FilePayloadCommandValidation,
])

export type ContentPayload =
  | SectionTitlePayload
  | TextPayload
  | LinkPayload
  | ImagePayload
  | ResourceLinkPayload
  | FilePayload
