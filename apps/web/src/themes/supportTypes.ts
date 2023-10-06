import { SupportType } from '@prisma/client'

export const supportTypeLabels: {
  [supportType in SupportType]: string
} = {
  [SupportType.Annuaire]: 'Annuaire',
  [SupportType.Article]: 'Article',
  [SupportType.BoiteOutils]: 'Boite à outils',
  [SupportType.Cartographie]: 'Cartographie',
  [SupportType.Infographie]: 'Infographie',
  [SupportType.Jeu]: 'Jeu',
  [SupportType.Logiciel]: 'Logiciel / Application',
  [SupportType.Methodologie]: 'Méthodologie',
  [SupportType.ModeleNotice]: 'Modèle - Notice',
  [SupportType.Questionnaire]: 'Questionnaire',
  [SupportType.SiteWeb]: 'Site Web',
  [SupportType.SupportPedagogique]: 'Support pédagogique',
  [SupportType.Tutoriel]: 'Tutoriel',
  [SupportType.Video]: 'Vidéo',
}

export const supportTypeOptions = Object.entries(supportTypeLabels).map(
  ([value, name]) => ({
    value,
    name,
  }),
)
