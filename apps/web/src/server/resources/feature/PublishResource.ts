import {
  Beneficiary,
  ProfessionalSector,
  ResourceType,
  Theme,
} from '@prisma/client'
import z from 'zod'

export const themesLimit = 5
export const resourceTypesLimit = 4
export const beneficiariesLimit = 5
export const professionalSectorsLimit = 5

export const indexationCommand = {
  themes: z
    .array(z.nativeEnum(Theme), {
      required_error: 'Merci d’ajouter au moins une thématique',
    })
    .max(
      themesLimit,
      `Vous ne pouvez pas ajouter plus de ${themesLimit} thématiques`,
    ),
  resourceTypes: z
    .array(z.nativeEnum(ResourceType), {
      required_error: 'Merci d’ajouter au moins un type de ressource',
    })
    .max(
      resourceTypesLimit,
      `Vous ne pouvez pas ajouter plus de ${resourceTypesLimit} types de ressource`,
    ),
  beneficiaries: z
    .array(z.nativeEnum(Beneficiary), {
      required_error: 'Merci d’ajouter au moins un bénéficiaire',
    })
    .max(
      beneficiariesLimit,
      `Vous ne pouvez pas ajouter plus de ${beneficiariesLimit} bénéficiaires`,
    ),
  professionalSectors: z
    .array(z.nativeEnum(ProfessionalSector), {
      required_error: 'Merci d’ajouter au moins un secteur professionnel',
    })
    .max(
      professionalSectorsLimit,
      `Vous ne pouvez pas ajouter plus de ${professionalSectorsLimit} secteurs professionnels`,
    ),
}

export const PublishCommandValidation = z.object({
  name: z.literal('Publish'),
  payload: z.discriminatedUnion(
    'isPublic',
    [
      z.object({
        resourceId: z.string().uuid(),
        isPublic: z.literal(true),
        themes: indexationCommand.themes.min(
          1,
          'Merci d’ajouter au moins une thématique',
        ),
        resourceTypes: indexationCommand.resourceTypes.min(
          1,
          'Merci d’ajouter au moins un type de ressource',
        ),
        beneficiaries: indexationCommand.beneficiaries.min(
          1,
          'Merci d’ajouter au moins un bénéficiaire',
        ),
        professionalSectors: indexationCommand.professionalSectors.min(
          1,
          'Merci d’ajouter au moins un secteur professionnel',
        ),
      }),
      z.object({
        resourceId: z.string().uuid(),
        isPublic: z.literal(false),
      }),
    ],
    {
      errorMap: () => ({
        message: 'Veuillez specifier la visibilité de la ressource',
      }),
    },
  ),
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
      themes: Theme[]
      resourceTypes: ResourceType[]
      beneficiaries: Beneficiary[]
      professionalSectors: ProfessionalSector[]
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
