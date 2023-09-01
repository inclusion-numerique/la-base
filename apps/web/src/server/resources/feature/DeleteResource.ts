import z from 'zod'

export const DeleteCommandValidation = z.object({
  name: z.literal('Delete'),
  payload: z.object({
    resourceId: z.string().uuid(),
  }),
})

export type DeleteCommand = z.infer<typeof DeleteCommandValidation>

export type ResourceDeletedV1 = {
  __version: 1
}

export type ResourceDeleted = {
  type: 'Deleted'
  timestamp: Date
  data: ResourceDeletedV1
}
