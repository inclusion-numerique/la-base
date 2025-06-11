import {
  type SelectOption,
  labelsToOptions,
} from '@app/ui/components/Form/utils/options'
import type { Theme } from '@prisma/client'

/**
 * Resource themes labels and their category mappings
 */

export const categories = [
  'Inclusion numérique',
  'Culture numérique',
  'Communs & souveraineté',
  'Numérique & environnement',
] as const

export type Category = (typeof categories)[number]

export type CategoryStyle = {
  icon: string
  color: string
  background: string
  href: string
}

export type CategoryTagStyle = {
  selected: string
  unselected: string
}

export const CATEGORY_VARIANTS_TAG: Record<Category, CategoryTagStyle> = {
  'Inclusion numérique': {
    selected: 'fr-background-artwork-minor--green-archipel',
    unselected: 'fr-background-alt--green-archipel',
  },
  'Culture numérique': {
    selected: 'fr-background-artwork-minor--pink-tuile',
    unselected: 'fr-background-contrast--pink-tuile',
  },
  'Communs & souveraineté': {
    selected: 'fr-background-artwork-minor--yellow-tournesol',
    unselected: 'fr-background-alt--yellow-tournesol',
  },
  'Numérique & environnement': {
    selected: 'fr-background-artwork-minor--green-bourgeon',
    unselected: 'fr-background-alt--green-bourgeon',
  },
}

export const CATEGORY_VARIANTS: Record<Category, CategoryStyle> = {
  'Inclusion numérique': {
    icon: 'ri-service-fill',
    color: 'fr-text-label--green-archipel',
    background: 'fr-background-alt--green-archipel',
    href: '/inclusion-numerique',
  },
  'Culture numérique': {
    icon: 'ri-stack-fill',
    color: 'fr-text-label--pink-tuile',
    background: 'fr-background-alt--pink-tuile',
    href: '/culture-numerique',
  },
  'Communs & souveraineté': {
    icon: 'ri-government-fill',
    color: 'fr-text-label--yellow-tournesol',
    background: 'fr-background-alt--yellow-tournesol',
    href: '/communs-et-souverainete',
  },
  'Numérique & environnement': {
    icon: 'ri-leaf-fill',
    color: 'fr-text-label--green-bourgeon',
    background: 'fr-background-alt--green-bourgeon',
    href: '/numerique-et-environnement',
  },
}

export const themeLabels: { [theme in Theme]: string } = {
  AidesAuxDemarchesAdministratives: 'Aide aux démarches administratives',
  Accessibilite: 'Accessibilité',
  LoisirsEtCreationsNumeriques: 'Loisirs et créations numériques',
  CitoyenneteEtEngagement: 'Citoyenneté & engagement',
  CodeEtProgrammation: 'Code & programmation',
  ReseauxSociauxEtCommunication: 'Réseaux sociaux & communication',
  CommunsNumeriques: 'Communs numériques',
  DiagnosticDeCompetencesNumeriques: 'Diagnostic de compétences numériques',
  Donnees: 'Données',
  EconomieNumerique: 'Économie numérique',
  EmploiEtEntrepreunariat: 'Emploi & entrepreunariat',
  GouvernancesPartagees: 'Gouvernances partagées',
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
  RisquesCyberEtProtection: 'Inclusion numérique',
  SobrieteNumerique: 'Sobriété numérique',
  SouveraineteNumeriqueEtHebergementDesDonnees:
    'Souveraineté numérique & hébergement des données',
  EducationAuxMedias: 'Éducation aux médias',
}

export const themeCategories: { [theme in Theme]: Category } = {
  Accessibilite: 'Inclusion numérique',
  LoisirsEtCreationsNumeriques: 'Culture numérique',
  CitoyenneteEtEngagement: 'Culture numérique',
  CodeEtProgrammation: 'Culture numérique',
  ReseauxSociauxEtCommunication: 'Inclusion numérique',
  CommunsNumeriques: 'Communs & souveraineté',
  AidesAuxDemarchesAdministratives: 'Inclusion numérique',
  DiagnosticDeCompetencesNumeriques: 'Inclusion numérique',
  Donnees: 'Culture numérique',
  EcoconceptionDeServicesNumeriques: 'Numérique & environnement',
  EconomieNumerique: 'Communs & souveraineté',
  EmploiEtEntrepreunariat: 'Culture numérique',
  GouvernancesPartagees: 'Communs & souveraineté',
  IntelligenceArtificielle: 'Culture numérique',
  JeuxVideos: 'Culture numérique',
  MaitriseDesOutilsNumeriques: 'Inclusion numérique',
  MaterielReconditionne: 'Numérique & environnement',
  Mobilites: 'Numérique & environnement',
  NavigationSurInternet: 'Inclusion numérique',
  NumeriqueAuServiceDeLEnvironnement: 'Numérique & environnement',
  NumeriqueEnSante: 'Inclusion numérique',
  OpenSourceEtLicencesLibres: 'Communs & souveraineté',
  Parentalite: 'Inclusion numérique',
  RisquesCyberEtProtection: 'Inclusion numérique',
  SobrieteNumerique: 'Numérique & environnement',
  SouveraineteNumeriqueEtHebergementDesDonnees: 'Communs & souveraineté',
  TerritoiresConnectesEtDurables: 'Numérique & environnement',
  UsagesResponsablesDuNumerique: 'Numérique & environnement',
  EducationAuxMedias: 'Culture numérique',
}

export const categoryThemes = (() => {
  const index: { [category in Category]: Theme[] } = {
    'Inclusion numérique': [],
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
    'Inclusion numérique': [],
    'Numérique & environnement': [],
    'Culture numérique': [],
    'Communs & souveraineté': [],
  } as { [category in Category]: SelectOption[] }

  for (const [theme, category] of Object.entries(themeCategories)) {
    index[category].push({
      label: themeLabels[theme as Theme],
      value: theme as Theme,
    })
  }

  return index
})()

export const themeOptions = labelsToOptions(themeLabels)
