import z from 'zod'
import { resourceEditionValues } from './utils'

export const EditResourceTitleValidation = z.object({
  id: resourceEditionValues.id,
  title: resourceEditionValues.title,
  description: resourceEditionValues.description,
})
export type EditResourceTitle = z.infer<typeof EditResourceTitleValidation>

export const EditResourceBaseValidation = z.object({
  id: resourceEditionValues.id,
  baseId: resourceEditionValues.baseId,
})
export type EditResourceBase = z.infer<typeof EditResourceBaseValidation>
