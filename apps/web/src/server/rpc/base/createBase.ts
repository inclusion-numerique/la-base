import z from 'zod'

export const CreateBaseCommandValidation = z.object({
  title: z
    .string({ required_error: 'Veuillez renseigner le nom de la base' })
    .trim()
    .nonempty('Veuillez renseigner le nom de la base'),
  description: z.string().trim().optional(),
  isPublic: z.boolean({
    required_error: 'Veuillez spécifier la visibilité de la base',
  }),
})

export type CreateBaseCommand = z.infer<typeof CreateBaseCommandValidation>
