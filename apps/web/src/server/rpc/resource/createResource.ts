import z from 'zod'
import { resourceEditionValues } from './utils'

export const CreateResourceValidation = z.object({
  title: resourceEditionValues.title,
  description: resourceEditionValues.description,
  baseId: resourceEditionValues.baseId,
})

export type CreateResource = z.infer<typeof CreateResourceValidation>
