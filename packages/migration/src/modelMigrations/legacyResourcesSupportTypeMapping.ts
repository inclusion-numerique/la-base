import { SupportType } from '@prisma/client'

export const legacyResourcesSupportTypeMapping: {
  [legacyId: number]: SupportType
} = {
  // 44,Support pédagogique
  44: SupportType.SupportPedagogique,
  // 45,Tutoriel
  45: SupportType.Tutoriel,
  // 33,Guide
  33: SupportType.Tutoriel,
  // 35,Jeu
  35: SupportType.Jeu,
  // 39,Méthodologie
  39: SupportType.Methodologie,
  // 43,Site Web
  43: SupportType.SiteWeb,
  // 29,Bibliothèque d'outils
  29: SupportType.BoiteOutils,
  // 38,Logiciel / Application
  38: SupportType.Logiciel,
  // 36,Kit
  36: SupportType.BoiteOutils,
  // 41,Questionnaire
  41: SupportType.Questionnaire,
  // 30,Cartographie
  30: SupportType.Cartographie,
  // 27,Annuaire
  27: SupportType.Annuaire,
  // 40,Plan 2D/3D - Notice
  40: SupportType.ModeleNotice,
  // 28,Article
  28: SupportType.Article,
  // 34,Infographie
  34: SupportType.Infographie,
  // 47,Vidéo
  47: SupportType.Video,
  // 616,Newsletter
  616: SupportType.Article,
}

export const getSupportTypeFromLegacyTags = (
  resourceTags: { tag_id: bigint }[],
): SupportType[] => {
  // Use a set to have unique themes only
  const supportTypes = new Set<SupportType>()
  for (const tag of resourceTags) {
    const supportType = legacyResourcesSupportTypeMapping[Number(tag.tag_id)]
    if (supportType) {
      supportTypes.add(supportType)
    }
  }
  return [...supportTypes]
}
