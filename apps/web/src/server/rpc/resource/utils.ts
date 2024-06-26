import z from 'zod'

export const contentTitleMaxLength = 50
export const contentCaptionMaxLength = 280
export const resourceTitleMaxLength = 100
export const resourceDescriptionMaxLength = 560
export const resourceSectionTitleMaxLength = 100

export const resourceEditionValues = {
  id: z.string(),
  title: z
    .string({ required_error: 'Veuillez renseigner le titre' })
    .trim()
    .nonempty('Veuillez renseigner le titre')
    .max(
      resourceTitleMaxLength,
      `Le titre ne doit pas dépasser ${resourceTitleMaxLength} caractères`,
    ),
  description: z
    .string({ required_error: 'Veuillez renseigner une description' })
    .trim()
    .nonempty('Veuillez renseigner une description')
    .max(
      resourceDescriptionMaxLength,
      `La description ne doit pas dépasser ${resourceDescriptionMaxLength} caractères`,
    ),
  baseId: z.string().nullable(),
}
