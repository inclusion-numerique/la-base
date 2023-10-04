import { Theme } from '@prisma/client'

/**
 * Resource themes labels and their category mappings
 */

export const categories = [
  'Médiation & compétences numériques',
  'Ecologie & soutenabilité',
  'Culture numérique',
  'Communs & souveraineté',
] as const

export type Category = (typeof categories)[number]

export const themeLabels: { [theme in Theme]: string } = {
  [Theme.DiagnosticDeCompetencesNumeriques]:
    'Diagnostic de compétences numériques',
  [Theme.DemarchesEtServicesEnLigne]: 'Démarches et services en ligne',
  [Theme.MaitriseDesOutilsNumeriques]: 'Maîtrise des outils numériques',
  [Theme.NavigationSurInternet]: 'Navigation sur Internet',
  [Theme.UsageDuMaterielInformatique]: 'Usage du matériel informatique',
  [Theme.SobrieteNumerique]: 'Sobriété numérique',
  [Theme.MaterielReconditionne]: 'Matériel reconditionné',
  [Theme.Mobilites]: 'Mobilités',
  [Theme.Accessibilite]: 'Accessibilité',
  [Theme.ActeursDuNumerique]: 'Acteurs du numérique',
  [Theme.ArtsEtCulture]: 'Arts et culture',
  [Theme.CitoyenneteEtEngagement]: 'Citoyenneté & engagement',
  [Theme.CodeEtProgrammation]: 'Code & programmation',
  [Theme.CommunicationEnLigneEtReseauxSociaux]:
    'Communication en ligne & réseaux sociaux',
  [Theme.EducationEtFormation]: 'Education & formation',
  [Theme.EmploiEtEntrepreunariat]: 'Emploi & entrepreunariat',
  [Theme.JeuxVideos]: 'Jeux vidéos',
  [Theme.NumeriqueEnSante]: 'Numérique en santé',
  [Theme.Parentalite]: 'Parentalité',
  [Theme.RisquesCyberEtProtection]: 'Risques cyber et protection',
  [Theme.CommunsNumeriques]: 'Communs numériques',
  [Theme.EconomieNumerique]: 'Économie numérique',
  [Theme.GouvernancesPartagees]: 'Gouvernances partagées',
  [Theme.IntelligenceArtificielle]: 'Intelligence artificielle',
  [Theme.OpenSourceEtLicencesLibres]: 'Open source et licences libres',
  [Theme.SouveraineteNumeriqueEtHebergementDesDonnees]:
    'Souveraineté numérique & hébergement des données',
}

export const themeCategories: { [theme in Theme]: Category } = {
  [Theme.DiagnosticDeCompetencesNumeriques]:
    'Médiation & compétences numériques',
  [Theme.DemarchesEtServicesEnLigne]: 'Médiation & compétences numériques',
  [Theme.MaitriseDesOutilsNumeriques]: 'Médiation & compétences numériques',
  [Theme.NavigationSurInternet]: 'Médiation & compétences numériques',
  [Theme.UsageDuMaterielInformatique]: 'Médiation & compétences numériques',
  [Theme.SobrieteNumerique]: 'Ecologie & soutenabilité',
  [Theme.MaterielReconditionne]: 'Ecologie & soutenabilité',
  [Theme.Mobilites]: 'Ecologie & soutenabilité',
  [Theme.Accessibilite]: 'Culture numérique',
  [Theme.ActeursDuNumerique]: 'Culture numérique',
  [Theme.ArtsEtCulture]: 'Culture numérique',
  [Theme.CitoyenneteEtEngagement]: 'Culture numérique',
  [Theme.CodeEtProgrammation]: 'Culture numérique',
  [Theme.CommunicationEnLigneEtReseauxSociaux]: 'Culture numérique',
  [Theme.EducationEtFormation]: 'Culture numérique',
  [Theme.EmploiEtEntrepreunariat]: 'Culture numérique',
  [Theme.JeuxVideos]: 'Culture numérique',
  [Theme.NumeriqueEnSante]: 'Culture numérique',
  [Theme.Parentalite]: 'Culture numérique',
  [Theme.RisquesCyberEtProtection]: 'Culture numérique',
  [Theme.CommunsNumeriques]: 'Communs & souveraineté',
  [Theme.EconomieNumerique]: 'Communs & souveraineté',
  [Theme.GouvernancesPartagees]: 'Communs & souveraineté',
  [Theme.IntelligenceArtificielle]: 'Communs & souveraineté',
  [Theme.OpenSourceEtLicencesLibres]: 'Communs & souveraineté',
  [Theme.SouveraineteNumeriqueEtHebergementDesDonnees]:
    'Communs & souveraineté',
}

export const categoryThemes = Object.fromEntries(
  categories.map((category) => [
    category,
    [Object.entries(themeCategories)]
      .filter(
        ([_itemTheme, itemCategory]) =>
          (itemCategory as unknown as Category) === category,
      )
      .map(([theme]) => theme),
  ]),
) as unknown as { [category in Category]: Theme[] }

export const themeOptions = Object.entries(themeLabels).map(
  ([value, name]) => ({
    value,
    name,
  }),
)
