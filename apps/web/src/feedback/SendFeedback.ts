import type { DifficultyArea } from '@prisma/client'
import z from 'zod'
import { labelsToOptions } from '@app/web/utils/options'
import { yesOrNo } from '@app/web/utils/yesNoBooleanOptions'

export const difficultyAreaLabels: {
  [key in DifficultyArea]: string
} = {
  Search: 'La recherche',
  Resources: 'La création de ressource',
  Collections: 'Les collections',
  Profile: 'Le profil',
  Bases: 'Les bases',
  Other: 'Autre',
}

const difficultyAreas = Object.keys(difficultyAreaLabels) as [
  keyof typeof difficultyAreaLabels,
]

export const difficultyAreasOptions = labelsToOptions(difficultyAreaLabels)

export const SendFeedbackValidation = z.object({
  rating: z
    .number({ required_error: 'Veuillez renseigner une note de satisfaction' })
    .int()
    .min(0)
    .max(10),
  hadDifficulty: z.enum(yesOrNo, {
    required_error:
      'Veuillez renseigner si vous avez rencontré des difficultés',
  }),
  difficultyArea: z.enum(difficultyAreas).nullish(),
  difficultyComment: z
    .string()
    .trim()
    // Empty string -> null
    .transform((email) => email || null)
    .nullish(),
  comment: z
    .string()
    .trim()
    // Empty string -> null
    .transform((email) => email || null)
    .nullish(),
  wantsToBeContacted: z
    .string()
    .email('Veuillez renseigner un email valide')
    // Accept empty string
    .or(z.literal(''))
    // Empty string -> null
    .transform((email) => email || null)
    .nullish(),
})

export type SendFeedbackData = z.infer<typeof SendFeedbackValidation>
