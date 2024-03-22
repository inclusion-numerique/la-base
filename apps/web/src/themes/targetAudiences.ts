import type { TargetAudience } from '@prisma/client'
import { SelectOption } from '@app/ui/components/Form/utils/options'

export const targetAudienceCategories = [
  'Acteurs du numérique d’intérêt général',
  'Bénéficiaires',
] as const

export type TargetAudienceCategory = (typeof targetAudienceCategories)[number]

// Create the same enum but sorted in alphabetical order
export const targetAudienceLabels: {
  [targetAudience in TargetAudience]: string
} = {
  AdministrationsEtablissementsPublics:
    'Administrations & établissements publics',
  Adultes: 'Adultes',
  AidantsNumeriques: 'Aidants numériques',
  Adolescents_12_18: 'Adolescents (12-18 ans)',
  AutresProfessionnels: 'Autres professionnels',
  AssociationsActeursEss: 'Associations & acteurs de l’ESS',
  CollectivitesTerritoriales: 'Collectivités territoriales',
  Elus: 'Élus',
  Enfants_6_12: 'Enfants (6-12 ans)',
  EnseignantsProfessionnelsFormation:
    'Enseignants & professionnels de la formation',
  Entreprises: 'Entreprises',
  JeunesAdultes_18_25: 'Jeunes adultes (18-25 ans)',
  JeunesEnfants_6: 'Jeunes enfants (<6 ans)',
  MediateursNumeriques: 'Médiateurs numériques',
  Particuliers: 'Particuliers',
  Parents: 'Parents',
  PersonneAllophone: 'Personne allophone',
  PersonneSituationHandicap: 'Personne en situation de handicap',
  PersonneSituationIlletrisme: 'Personne en situation d’illettrisme',
  PersonnesEnInsertionSociale: 'Personnes en insertion sociale',
  PersonnesInsertionProfessionnelle: 'Personnes en insertion professionnelle',
  PersonnesPerteAutonomie: 'Personnes en perte d’autonomie',
  PersonnesTresEloigneesNumerique: 'Personnes très éloignées du numérique',
  RefugiesDemandeursAsile: 'Réfugiés/demandeurs d’asile',
  SeniorsPersonnesAgees: 'Seniors & personnes âgées',
  TousPublics: 'Tous publics',
  TravailleursSociaux: 'Travailleurs sociaux',
}

export const targetAudienceCategoriesMap: {
  [targetAudience in TargetAudience]: TargetAudienceCategory
} = {
  AdministrationsEtablissementsPublics:
    'Acteurs du numérique d’intérêt général',
  Adultes: 'Bénéficiaires',
  AidantsNumeriques: 'Acteurs du numérique d’intérêt général',
  Adolescents_12_18: 'Bénéficiaires',
  AutresProfessionnels: 'Acteurs du numérique d’intérêt général',
  AssociationsActeursEss: 'Acteurs du numérique d’intérêt général',
  CollectivitesTerritoriales: 'Acteurs du numérique d’intérêt général',
  Elus: 'Acteurs du numérique d’intérêt général',
  Enfants_6_12: 'Bénéficiaires',
  EnseignantsProfessionnelsFormation: 'Acteurs du numérique d’intérêt général',
  Entreprises: 'Acteurs du numérique d’intérêt général',
  JeunesAdultes_18_25: 'Bénéficiaires',
  JeunesEnfants_6: 'Bénéficiaires',
  MediateursNumeriques: 'Acteurs du numérique d’intérêt général',
  Particuliers: 'Bénéficiaires',
  Parents: 'Bénéficiaires',
  PersonneAllophone: 'Bénéficiaires',
  PersonneSituationHandicap: 'Bénéficiaires',
  PersonneSituationIlletrisme: 'Bénéficiaires',
  PersonnesEnInsertionSociale: 'Bénéficiaires',
  PersonnesInsertionProfessionnelle: 'Bénéficiaires',
  PersonnesPerteAutonomie: 'Bénéficiaires',
  PersonnesTresEloigneesNumerique: 'Bénéficiaires',
  RefugiesDemandeursAsile: 'Bénéficiaires',
  SeniorsPersonnesAgees: 'Bénéficiaires',
  TousPublics: 'Bénéficiaires',
  TravailleursSociaux: 'Acteurs du numérique d’intérêt général',
}
export const targetAudienceOptions = Object.entries(targetAudienceLabels).map(
  ([value, name]) => ({
    value,
    name,
  }),
)

export const categoryTargetAudiences = (() => {
  const index: { [category in TargetAudienceCategory]: TargetAudience[] } = {
    'Acteurs du numérique d’intérêt général': [],
    Bénéficiaires: [],
  }

  for (const [targetAudience, category] of Object.entries(
    targetAudienceCategoriesMap,
  )) {
    index[category].push(targetAudience as TargetAudience)
  }

  return index
})()

export const categoryTargetAudiencesOptions = (() => {
  const index: { [category in TargetAudienceCategory]: SelectOption[] } = {
    'Acteurs du numérique d’intérêt général': [],
    Bénéficiaires: [],
  }

  for (const [targetAudience, category] of Object.entries(
    targetAudienceCategoriesMap,
  )) {
    index[category].push({
      name: targetAudienceLabels[targetAudience as TargetAudience],
      value: targetAudience as TargetAudience,
    })
  }

  return index
})()
