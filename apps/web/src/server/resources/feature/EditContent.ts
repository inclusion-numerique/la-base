import z from 'zod'
import { ContentPayloadCommandValidation } from './Content'

export const EditContentCommandValidation = z.object({
  name: z.literal('EditContent'),
  payload: z.intersection(
    z.object({
      resourceId: z.string().uuid(),
      id: z.string().uuid(),
    }),
    ContentPayloadCommandValidation,
  ),
})

export type EditContentCommand = z.infer<typeof EditContentCommandValidation>

export type ContentEditedV1 = {
  __version: 1
  id: string
  title?: string
  text?: string
  caption?: string | null
  url?: string
  showPreview?: boolean
  linkDescription?: string | null
  linkTitle?: string | null
  linkImageUrl?: string | null
  linkFaviconUrl?: string | null
}

export type ContentEdited = {
  type: 'ContentEdited'
  timestamp: Date
  data: ContentEditedV1
}
