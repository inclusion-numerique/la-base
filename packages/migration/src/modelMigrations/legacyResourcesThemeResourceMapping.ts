import { Theme } from '@prisma/client'

export const legacyResourcesThemeResourceMapping: {
  [legacyId: number]: Theme
} = {
  // 623,Accessibilité
  623: Theme.Accessibilite,
  // 79,Arts et culture
  79: Theme.ArtsEtCulture,
  // 83,Citoyenneté / engagement
  83: Theme.CitoyenneteEtEngagement,
  // 85,Code / programmation
  85: Theme.CodeEtProgrammation,
  // 90,Communication en ligne / réseaux sociaux
  90: Theme.CommunicationEnLigneEtReseauxSociaux,
  // 73,Entrepreneuriat
  73: Theme.EmploiEtEntrepreunariat,
  // 62,Harcèlement
  62: Theme.RisquesCyberEtProtection,
  // 84,Intelligence artificielle
  84: Theme.IntelligenceArtificielle,
  // 77,Jeux Vidéos
  77: Theme.JeuxVideos,
  // 71,Mobilités
  71: Theme.Mobilites,
  // 68,Parentalité
  68: Theme.Parentalite,
  // 63,Santé
  63: Theme.NumeriqueEnSante,
  // 94,Sécurité / protection
  94: Theme.RisquesCyberEtProtection,
  // 70,Travail
  70: Theme.EmploiEtEntrepreunariat,
  // 67,Education
  67: Theme.EducationEtFormation,
  // 74,Formation / éducation
  74: Theme.EducationEtFormation,
  // 92,Matériel informatique
  92: Theme.UsageDuMaterielInformatique,
  // 93,Services / démarches en ligne
  93: Theme.DemarchesEtServicesEnLigne,
  // 91,Logiciels et outils numériques
  91: Theme.MaitriseDesOutilsNumeriques,
  // 147,Communs numériques
  147: Theme.CommunsNumeriques,
  // 88,Economie numérique
  88: Theme.EconomieNumerique,
  // 632,Open source
  632: Theme.OpenSourceEtLicencesLibres,
  // 89,Sobriété numérique
  89: Theme.SobrieteNumerique,
  // 78,Energie / éco-gestes
  78: Theme.SobrieteNumerique,
}

export const getThemesFromLegacyTags = (
  resourceTags: { tag_id: bigint }[],
): Theme[] => {
  // Use a set to have unique themes only
  const themes = new Set<Theme>()
  for (const tag of resourceTags) {
    const theme = legacyResourcesThemeResourceMapping[Number(tag.tag_id)]
    if (theme) {
      themes.add(theme)
    }
  }
  return [...themes]
}
