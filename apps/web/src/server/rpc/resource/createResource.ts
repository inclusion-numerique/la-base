import z from 'zod'

export const createResourceTitleMaxLength = 100
export const createResourceDescriptionMaxLength = 560

export const CreateResourceValidation = z.object({
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
  baseId: z.string().nullable(),
})

export type CreateResource = z.infer<typeof CreateResourceValidation>
