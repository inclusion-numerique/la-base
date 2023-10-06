import z from 'zod'
import type { Theme } from '@prisma/client'
import { indexationCommand } from './PublishResource'

export const ChangeIndexationCommandValidation = z.object({
  name: z.literal('ChangeIndexation'),
  payload: z.object({
    resourceId: z.string().uuid(),
    ...indexationCommand,
  }),
})

export type ChangeIndexationCommand = z.infer<
  typeof ChangeIndexationCommandValidation
>

type IndexationChangedDataV1 = {
  __version: 1
  themes: Theme[]
  supportTypes: string[]
  targetAudiences: string[]
}

export type IndexationChanged = {
  type: 'IndexationChanged'
  timestamp: Date
  data: IndexationChangedDataV1
}