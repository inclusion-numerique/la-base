import { TargetAudience } from '@prisma/client'

// Create the same enum but sorted in alphabetical order
export const targetAudienceLabels: {
  [targetAudience in TargetAudience]: string
} = {
  [TargetAudience.AdministrationsEtablissementsPublics]:
    'Administrations & établissements publics',
  [TargetAudience.Adultes]: 'Adultes',
  [TargetAudience.AidantsNumeriques]: 'Aidants numériques',
  [TargetAudience.Adolescents12_18]: 'Adolescents (12-18 ans)',
  [TargetAudience.AutresProfessionnels]: 'Autres professionnels',
  [TargetAudience.AssociationsActeursEss]: 'Associations & acteurs de l’ESS',
  [TargetAudience.CollectivitesTerritoriales]: 'Collectivités territoriales',
  [TargetAudience.Elus]: 'Élus',
  [TargetAudience.Enfants6_12]: 'Enfants (6-12 ans)',
  [TargetAudience.EnseignantsProfessionnelsFormation]:
    'Enseignants & professionnels de la formation',
  [TargetAudience.Entreprises]: 'Entreprises',
  [TargetAudience.JeunesAdultes18_25]: 'Jeunes adultes (18-25 ans)',
  [TargetAudience.JeunesEnfants6]: 'Jeunes enfants (<6 ans)',
  [TargetAudience.MediateursNumeriques]: 'Médiateurs numériques',
  [TargetAudience.Particuliers]: 'Particuliers',
  [TargetAudience.Parents]: 'Parents',
  [TargetAudience.PersonneAllophone]: 'Personne allophone',
  [TargetAudience.PersonneSituationHandicap]:
    'Personne en situation de handicap',
  [TargetAudience.PersonneSituationIlletrisme]:
    'Personne en situation d’illetrisme',
  [TargetAudience.PersonnesEnInsertionSociale]:
    'Personnes en insertion sociale',
  [TargetAudience.PersonnesInsertionProfessionnelle]:
    'Personnes en insertion professionnelle',
  [TargetAudience.PersonnesPerteAutonomie]: 'Personnes en perte d’autonomie',
  [TargetAudience.PersonnesTresEloigneesNumerique]:
    'Personnes très éloignées du numérique',
  [TargetAudience.RefugiesDemandeursAsile]: 'Réfugiés/demandeurs d’asile',
  [TargetAudience.SeniorsPersonnesAgees]: 'Seniors & personnes âgées',
  [TargetAudience.TousPublics]: 'Tous publics',
  [TargetAudience.TravailleursSociaux]: 'Travailleurs sociaux',
}
export const targetAudienceOptions = Object.entries(targetAudienceLabels).map(
  ([value, name]) => ({
    value,
    name,
  }),
)
