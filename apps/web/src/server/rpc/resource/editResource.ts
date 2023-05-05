import z from 'zod'
import { resourceEditionValues } from './utils'

export const editResourceTitleValidation = z.object({
  id: resourceEditionValues.id,
  title: resourceEditionValues.title,
  description: resourceEditionValues.description,
})
export type EditResourceTitle = z.infer<typeof editResourceTitleValidation>

export const editResourceBaseValidation = z.object({
  id: resourceEditionValues.id,
  baseId: resourceEditionValues.baseId,
})
export type EditResourceBase = z.infer<typeof editResourceBaseValidation>
