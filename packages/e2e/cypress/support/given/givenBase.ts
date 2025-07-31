import type { CreateBaseInput } from '@app/e2e/tasks/handlers/user.tasks'
import { createSlug } from '@app/web/utils/createSlug'
import { v4 } from 'uuid'

export const defaultTestBaseTitle = 'Pôle inclusion numérique - Tests e2e'
export const defaultTestBaseDescription = `
  <p>Cette base est spécifiquement axée sur les tests automatisés de bout en bout (e2e).</p> 
  <p>L'objectif est de fournir une suite complète d'outils, de bibliothèques et de meilleures pratiques pour assurer une 
  qualité supérieure du produit livré. Les tests e2e simulent des scénarios d'utilisateur réel, offrant ainsi une couche
  de validation qui va au-delà des tests unitaires ou d'intégration. Ils sont essentiels pour s'assurer que l'ensemble 
  du système fonctionne comme prévu, depuis l'interface utilisateur jusqu'à la base de données. En outre, les tests e2e
  contribuent à accélérer le cycle de développement en minimisant le temps et les efforts nécessaires pour identifier et 
  résoudre les bugs en production.
  </p>
`

export const defaultTestBaseEmail = 'test-inclusion-numerique@anct.gouv.fr'
export const defaultTestBaseSlug = createSlug(defaultTestBaseTitle)

export const givenBase = (
  data: Partial<Omit<CreateBaseInput, 'members'>> & {
    createdById: string
    isPublic: boolean
  },
  { acceptedMemberIds }: { acceptedMemberIds?: string[] } = {},
) =>
  ({
    id: data.id ?? v4(),
    title: data.title ?? defaultTestBaseTitle,
    slug: data.slug ?? createSlug(data.title ?? defaultTestBaseTitle),
    titleDuplicationCheckSlug:
      data.titleDuplicationCheckSlug ??
      createSlug(data.title ?? defaultTestBaseTitle),
    description: defaultTestBaseDescription,
    createdById: data.createdById,
    isPublic: data.isPublic,
    email: defaultTestBaseEmail,
    emailIsPublic: true,
    collections: data.collections,
    department: data.department,
    deleted: data.deleted,
    members: {
      // Creator always have automatically created admin membre
      create: [
        {
          memberId: data.createdById,
          isAdmin: true,
          accepted: new Date('2022-01-01'),
        },
        ...(acceptedMemberIds?.map((memberId) => ({
          memberId,
          isAdmin: false,
          accepted: new Date('2022-01-01'),
        })) ?? []),
      ],
    },
  }) satisfies CreateBaseInput
