import z from 'zod'

export const RepublishCommandValidation = z.object({
  name: z.literal('Republish'),
  payload: z.object({
    resourceId: z.string().uuid(),
  }),
})

export type RepublishCommand = z.infer<typeof RepublishCommandValidation>

export type ResourceRepublishedV1 = {
  __version: 1
}

export type ResourceRepublished = {
  type: 'Republished'
  timestamp: Date
  data: ResourceRepublishedV1
}
