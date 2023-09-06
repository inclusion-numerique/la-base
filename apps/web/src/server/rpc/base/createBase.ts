import z from 'zod'

export const CreateBaseCommandValidation = z.object({
  title: z
    .string({ required_error: 'Veuillez renseigner le nom de la base' })
    .trim()
    .nonempty('Veuillez renseigner le nom de la base'),
  department: z.string().trim().optional(),
  description: z.string().trim().optional(),
  isPublic: z.boolean({
    required_error: 'Veuillez spécifier la visibilité de la base',
  }),
  email: z
    .string({ required_error: 'Veuillez renseigner une adresse e-mail' })
    .email('Veuillez entrer une adresse e-mail valide')
    .toLowerCase()
    .trim()
    .nonempty('Veuillez renseigner une adresse e-mail'),
  emailIsPublic: z.boolean(),
  website: z
    .string()
    .url('Veuiller renseigner une URL valide')
    .trim()
    .optional(),
  facebook: z
    .string()
    .url('Veuiller renseigner une URL valide')
    .trim()
    .optional(),
  twitter: z
    .string()
    .url('Veuiller renseigner une URL valide')
    .trim()
    .optional(),
  linkedin: z
    .string()
    .url('Veuiller renseigner une URL valide')
    .trim()
    .optional(),
})

export type CreateBaseCommand = z.infer<typeof CreateBaseCommandValidation>
