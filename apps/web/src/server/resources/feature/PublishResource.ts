import z from 'zod'

export const themesLimit = 5
export const supportTypesLimit = 4
export const targetAudiencesLimit = 5

export const PublishCommandValidation = z.object({
  name: z.literal('Publish'),
  payload: z.discriminatedUnion('isPublic', [
    z.object({
      resourceId: z.string().uuid(),
      isPublic: z.literal(true),
      themes: z
        .array(z.string(), {
          required_error: "Merci d'ajouter au moins une thématique",
        })
        .min(1, "Merci d'ajouter au moins une thématique")
        .max(
          themesLimit,
          `Vous ne pouvez pas ajouter plus de ${themesLimit} thématiques`,
        ),
      supportTypes: z
        .array(z.string(), {
          required_error: "Merci d'ajouter au moins un type de support",
        })
        .min(1, "Merci d'ajouter au moins un type de support")
        .max(
          supportTypesLimit,
          `Vous ne pouvez pas ajouter plus de ${supportTypesLimit} types de support`,
        ),
      targetAudiences: z
        .array(z.string(), {
          required_error: "Merci d'ajouter au moins un public visé",
        })
        .min(1, "Merci d'ajouter au moins un public visé")
        .max(
          targetAudiencesLimit,
          `Vous ne pouvez pas ajouter plus de ${targetAudiencesLimit} publics visés`,
        ),
    }),
    z.object({
      resourceId: z.string().uuid(),
      isPublic: z.literal(false),
    }),
  ]),
})

export type PublishCommand = z.infer<typeof PublishCommandValidation>

export type ResourcePublishedV1 = {
  __version: 1
  isPublic: boolean
  // Slug changes only if the title changes
  slug?: string
  titleDuplicationCheckSlug?: string
}

export type ResourcePublishedV2 = {
  __version: 2
  slug?: string
  titleDuplicationCheckSlug?: string
} & (
  | {
      isPublic: true
      themes: string[]
      supportTypes: string[]
      targetAudiences: string[]
    }
  | {
      isPublic: false
    }
)

export type ResourcePublished = {
  type: 'Published'
  timestamp: Date
  data: ResourcePublishedV2
}
