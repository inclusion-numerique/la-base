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

export const SendFeedbackValidation = z
  .object({
    rating: z
      .number({
        required_error: 'Veuillez renseigner une note de satisfaction',
      })
      .int()
      .min(1)
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
      .email('Veuillez renseigner une adresse email valide')
      // Accept empty string
      .or(z.literal(''))
      // Empty string -> null
      .transform((email) => email || null)
      .nullish(),
  })
  .superRefine((values, context) => {
    if (
      (values.comment != null || values.difficultyComment != null) &&
      values.wantsToBeContacted == null
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Veuillez renseigner une adresse email sur laquelle nous pouvons vous contacter',
        path: ['wantsToBeContacted'],
      })
    }
    if (values.hadDifficulty === 'yes' && !values.difficultyArea) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Veuillez indiquer le type de difficulté que vous avez rencontré',
        path: ['difficultyArea'],
      })
    }
  })

export type SendFeedbackData = z.infer<typeof SendFeedbackValidation>
