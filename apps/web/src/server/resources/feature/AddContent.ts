import z from 'zod'
import { ContentType } from '@prisma/client'
import { ContentPayloadCommandValidation } from './Content'

export const AddContentCommandValidation = z.object({
  name: z.literal('AddContent'),
  payload: z.intersection(
    z.object({ resourceId: z.string().uuid() }),
    ContentPayloadCommandValidation,
  ),
})

export type AddContentCommand = z.infer<typeof AddContentCommandValidation>

export type ContentAddedV1 = {
  __version: 1
  id: string
  type: ContentType
  title?: string
  text?: string
  caption?: string | null
  imageId?: string | null
  imageAltText?: string | null
  fileKey?: string | null
  url?: string
  showPreview?: boolean
  linkDescription?: string | null
  linkTitle?: string | null
  linkImageUrl?: string | null
  linkFaviconUrl?: string | null
}

export type ContentAdded = {
  type: 'ContentAdded'
  timestamp: Date
  data: ContentAddedV1
}
