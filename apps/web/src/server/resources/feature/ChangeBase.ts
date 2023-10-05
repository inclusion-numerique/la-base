import z from 'zod'

export const ChangeBaseCommandValidation = z.object({
  name: z.literal('ChangeBase'),
  payload: z.object({
    resourceId: z.string().uuid(),
    baseId: z.string().uuid().nullable(),
  }),
})

export type ChangeBaseCommand = z.infer<typeof ChangeBaseCommandValidation>

type BaseChangedDataV1 = {
  __version: 1
  baseId: string | null
}

type BaseChangedDataV2 = {
  __version: 2
  baseId: string | null
  isPublic: boolean
}

export type BaseChanged = {
  type: 'BaseChanged'
  timestamp: Date
  data: BaseChangedDataV1 | BaseChangedDataV2
}
