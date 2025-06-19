import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import type { SupportType } from '@prisma/client'

export const supportTypeLabels: {
  [supportType in SupportType]: string
} = {
  Annuaire: 'Annuaire',
  Article: 'Article',
  BoiteOutils: 'Boite à outils',
  Cartographie: 'Cartographie',
  Infographie: 'Infographie',
  Jeu: 'Jeu',
  Logiciel: 'Logiciel / Application',
  Methodologie: 'Méthodologie',
  ModeleNotice: 'Modèle - Notice',
  Questionnaire: 'Questionnaire',
  SiteWeb: 'Site Web',
  SupportPedagogique: 'Support pédagogique',
  Tutoriel: 'Tutoriel',
  Video: 'Vidéo',
}

export const supportTypeOptions = labelsToOptions(supportTypeLabels)
