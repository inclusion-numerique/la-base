import { SelectOption } from '@app/ui/components/Form/utils/options'
import type { Theme } from '@prisma/client'

/**
 * Resource themes labels and their category mappings
 */

export const categories = [
  'Inclusion & compétences numériques',
  'Numérique & environnement',
  'Culture numérique',
  'Communs & souveraineté',
] as const

export type Category = (typeof categories)[number]

export const themeLabels: { [theme in Theme]: string } = {
  Accessibilite: 'Accessibilité',
  ActeursDuNumerique: 'Acteurs du numérique',
  ArtsEtCulture: 'Arts et culture',
  CitoyenneteEtEngagement: 'Citoyenneté & engagement',
  CodeEtProgrammation: 'Code & programmation',
  CommunicationEnLigneEtReseauxSociaux:
    'Communication en ligne & réseaux sociaux',
  CommunsNumeriques: 'Communs numériques',
  DemarchesEtServicesEnLigne: 'Démarches et services en ligne',
  DiagnosticDeCompetencesNumeriques: 'Diagnostic de compétences numériques',
  Donnees: 'Données',
  EconomieNumerique: 'Économie numérique',
  EducationEtFormation: 'Education & formation',
  EmploiEtEntrepreunariat: 'Emploi & entrepreunariat',
  GouvernancesPartagees: 'Gouvernances partagées',
  InclusionNumerique: 'Inclusion numérique',
  IntelligenceArtificielle: 'Intelligence artificielle',
  JeuxVideos: 'Jeux vidéos',
  MaitriseDesOutilsNumeriques: 'Maîtrise des outils numériques',
  MaterielReconditionne: 'Matériel reconditionné',
  Mobilites: 'Mobilités',
  EcoconceptionDeServicesNumeriques: 'Écoconception de services numériques',
  UsagesResponsablesDuNumerique: 'Usages responsables du numérique',
  NumeriqueAuServiceDeLEnvironnement: 'Numérique au service de l’environnement',
  TerritoiresConnectesEtDurables: 'Territoires connectés et durables',
  NavigationSurInternet: 'Navigation sur Internet',
  NumeriqueEnSante: 'Numérique en santé',
  OpenSourceEtLicencesLibres: 'Open source et licences libres',
  Parentalite: 'Parentalité',
  RisquesCyberEtProtection: 'Risques cyber et protection',
  SobrieteNumerique: 'Sobriété numérique',
  SouveraineteNumeriqueEtHebergementDesDonnees:
    'Souveraineté numérique & hébergement des données',
  UsageDuMaterielInformatique: 'Usage du matériel informatique',
}

export const themeCategories: { [theme in Theme]: Category } = {
  Accessibilite: 'Inclusion & compétences numériques',
  ActeursDuNumerique: 'Culture numérique',
  ArtsEtCulture: 'Culture numérique',
  CitoyenneteEtEngagement: 'Culture numérique',
  CodeEtProgrammation: 'Culture numérique',
  CommunicationEnLigneEtReseauxSociaux: 'Culture numérique',
  CommunsNumeriques: 'Communs & souveraineté',
  DemarchesEtServicesEnLigne: 'Inclusion & compétences numériques',
  DiagnosticDeCompetencesNumeriques: 'Inclusion & compétences numériques',
  Donnees: 'Culture numérique',
  EcoconceptionDeServicesNumeriques: 'Numérique & environnement',
  EconomieNumerique: 'Communs & souveraineté',
  EducationEtFormation: 'Culture numérique',
  EmploiEtEntrepreunariat: 'Culture numérique',
  GouvernancesPartagees: 'Communs & souveraineté',
  InclusionNumerique: 'Inclusion & compétences numériques',
  IntelligenceArtificielle: 'Communs & souveraineté',
  JeuxVideos: 'Culture numérique',
  MaitriseDesOutilsNumeriques: 'Inclusion & compétences numériques',
  MaterielReconditionne: 'Numérique & environnement',
  Mobilites: 'Numérique & environnement',
  NavigationSurInternet: 'Inclusion & compétences numériques',
  NumeriqueAuServiceDeLEnvironnement: 'Numérique & environnement',
  NumeriqueEnSante: 'Culture numérique',
  OpenSourceEtLicencesLibres: 'Communs & souveraineté',
  Parentalite: 'Culture numérique',
  RisquesCyberEtProtection: 'Culture numérique',
  SobrieteNumerique: 'Numérique & environnement',
  SouveraineteNumeriqueEtHebergementDesDonnees: 'Communs & souveraineté',
  TerritoiresConnectesEtDurables: 'Numérique & environnement',
  UsageDuMaterielInformatique: 'Inclusion & compétences numériques',
  UsagesResponsablesDuNumerique: 'Numérique & environnement',
}

export const categoryThemes = (() => {
  const index: { [category in Category]: Theme[] } = {
    'Inclusion & compétences numériques': [],
    'Numérique & environnement': [],
    'Culture numérique': [],
    'Communs & souveraineté': [],
  }

  for (const [theme, category] of Object.entries(themeCategories)) {
    index[category].push(theme as Theme)
  }

  return index
})()

export const categoryThemesOptions = (() => {
  const index: { [category in Category]: SelectOption[] } = {
    'Inclusion & compétences numériques': [],
    'Numérique & environnement': [],
    'Culture numérique': [],
    'Communs & souveraineté': [],
  }

  for (const [theme, category] of Object.entries(themeCategories)) {
    index[category].push({
      name: themeLabels[theme as Theme],
      value: theme as Theme,
    })
  }

  return index
})()

export const themeOptions = Object.entries(themeLabels).map(
  ([value, name]) => ({
    value,
    name,
  }),
)
