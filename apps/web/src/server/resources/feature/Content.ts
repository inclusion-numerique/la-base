import z from 'zod'
import { resourceTitleMaxLength } from '@app/web/server/rpc/resource/utils'

const SectionTitlePayloadCommandValidation = z.object({
  type: z.literal('SectionTitle'),
  title: z
    .string({ required_error: 'Veuillez renseigner le titre' })
    .trim()
    .nonempty('Veuillez renseigner le titre')
    .max(
      resourceTitleMaxLength,
      `Le titre ne doit pas dépasser ${resourceTitleMaxLength} caractères`,
    ),
})

const TextPayloadCommandValidation = z.object({
  type: z.literal('Text'),
  text: z
    .string({ required_error: 'Veuillez renseigner le text' })
    .trim()
    .nonempty('Veuillez renseigner le text'),
})

const ImagePayloadCommandValidation = z.object({
  type: z.literal('Image'),
})

const LinkPayloadCommandValidation = z.object({
  type: z.literal('Link'),
})

const ResourceLinkPayloadCommandValidation = z.object({
  type: z.literal('ResourceLink'),
})

const FilePayloadCommandValidation = z.object({
  type: z.literal('File'),
})

export const ContentPayloadCommandValidation = z.discriminatedUnion('type', [
  SectionTitlePayloadCommandValidation,
  TextPayloadCommandValidation,
  ImagePayloadCommandValidation,
  LinkPayloadCommandValidation,
  ResourceLinkPayloadCommandValidation,
  FilePayloadCommandValidation,
])
