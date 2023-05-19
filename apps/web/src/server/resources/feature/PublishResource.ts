import z from 'zod'

export const PublishCommandValidation = z.object({
  name: z.literal('Publish'),
  payload: z.object({
    resourceId: z.string().uuid(),
    isPublic: z.boolean(),
  }),
})

export type PublishCommand = z.infer<typeof PublishCommandValidation>

export type ResourcePublishedV1 = {
  __version: 1
  isPublic: boolean
  // Slug changes only if the title changes
  slug?: string
  titleDuplicationCheckSlug?: string
}

export type ResourcePublished = {
  type: 'Published'
  timestamp: Date
  data: ResourcePublishedV1
}
