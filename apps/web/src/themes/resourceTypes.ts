import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import type { ResourceType } from '@prisma/client'

export const resourceTypesLabels: {
  [resourceType in ResourceType]: string
} = {
  ResourcePedagogique: 'Ressources pédagogiques',
  OutilsNumeriques: 'Outils Numériques',
  Annuaire: 'Annuaire',
  Article: 'Article',
  BoiteOutils: 'Boite à outils',
  Infographie: 'Infographie',
  Methodologie: 'Méthodologie',
  Questionnaire: 'Questionnaire',
  VideoWebinaire: 'Vidéo / Webinaire',
}

export const resourceTypesOptions = labelsToOptions(resourceTypesLabels, {
  hints: {
    ResourcePedagogique: "Tutoriels, supports d'ateliers, jeux, formations...",
    OutilsNumeriques: 'Site web, logiciel, application...',
  },
})
