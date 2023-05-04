import z from 'zod'
import {
  createResourceDescriptionMaxLength,
  createResourceTitleMaxLength,
} from './createResource'

export const EditResourceTitleValidation = z.object({
  id: z.string(),
  title: z
    .string({ required_error: 'Veuillez renseigner le titre' })
    .trim()
    .max(
      createResourceTitleMaxLength,
      `Le titre ne doit pas dépasser ${createResourceTitleMaxLength} caractères`,
    ),
  description: z
    .string({ required_error: 'Veuillez renseigner une description' })
    .trim()
    .max(
      createResourceDescriptionMaxLength,
      `La description ne doit pas dépasser ${createResourceDescriptionMaxLength} caractères`,
    ),
})

export type EditResourceTitle = z.infer<typeof EditResourceTitleValidation>
