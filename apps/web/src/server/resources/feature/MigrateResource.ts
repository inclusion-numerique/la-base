import z from 'zod'
import { ContentType, SupportType, TargetAudience, Theme } from '@prisma/client'
import { CreateResourceCommandPayloadValidation } from '@app/web/server/resources/feature/CreateResource'

export const MigrateResourceCommandValidation = z.object({
  name: z.literal('MigrateResource'),
  payload: CreateResourceCommandPayloadValidation.extend({
    legacyId: z.number(),
    byId: z.string().uuid(),
    slug: z.string(),
    titleDuplicationCheckSlug: z.string(),
    themes: z.array(z.nativeEnum(Theme)),
    supportTypes: z.array(z.nativeEnum(SupportType)),
    targetAudiences: z.array(z.nativeEnum(TargetAudience)),
    imageId: z.string().uuid().nullable(),
    created: z.date(),
    updated: z.date(),
    published: z.date().nullable(),
    isPublic: z.boolean(),
    contents: z.array(
      // We do not reuse other command payload as migration is less restrictive
      z.object({
        id: z.string().uuid(),
        legacyContentId: z.number().nullable(),
        legacySectionId: z.number().nullable(),
        order: z.number().int(),
        type: z.nativeEnum(ContentType),
        title: z.string().nullable(),
        caption: z.string().nullable(),
        imageId: z.string().uuid().nullable(),
        imageAltText: z.string().nullable(),
        fileKey: z.string().nullable(),
        showPreview: z.boolean().nullable(),
        url: z.string().nullable(),
        linkDescription: z.string().nullable(),
        linkTitle: z.string().nullable(),
        linkImageUrl: z.string().nullable(),
        linkFaviconUrl: z.string().nullable(),
        legacyLinkedResourceId: z.number().nullable(),
        text: z.string().nullable(),
        created: z.date(),
        updated: z.date(),
      }),
    ),
  }),
})

export type MigrateResourceCommand = z.infer<
  typeof MigrateResourceCommandValidation
>

export type ResourceMigratedDataV1 = {
  __version: 1
  id: string
  slug: string
  titleDuplicationCheckSlug: string
  themes: Theme[]
  supportTypes: SupportType[]
  targetAudiences: TargetAudience[]
  title: string
  description: string
  baseId: string | null
  imageId: string | null
  legacyId: number
  byId: string
  // Dates have to be serialized for event storage
  created: string
  updated: string
  published: string | null
  isPublic: boolean
  contents: {
    id: string
    legacyContentId: number | null
    legacySectionId: number | null
    order: number
    type: ContentType
    title: string | null
    caption: string | null
    imageId: string | null
    imageAltText: string | null
    fileKey: string | null
    showPreview: boolean | null
    url: string | null
    linkDescription: string | null
    linkTitle: string | null
    linkImageUrl: string | null
    linkFaviconUrl: string | null
    legacyLinkedResourceId: number | null
    text: string | null
    created: string
    updated: string
  }[]
}
export type ResourceMigrated = {
  type: 'Migrated'
  timestamp: Date
  data: ResourceMigratedDataV1
}
