import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { Beneficiary } from '@prisma/client'

export const beneficiariesLabels: {
  [beneficiary in Beneficiary]: string
} = {
  TousPublics: 'Tous publics',
  EnfantsMineurs: 'Enfants mineurs',
  Adultes: 'Adultes',
  SeniorsPersonnesAgees: 'Seniors & personnes âgées',
  Parents: 'Parents',
  PersonnesTresEloigneesNumerique: 'Personnes très éloignées du numérique',
  PersonneSituationHandicapOuPerteAutonomie:
    "Personne en situation de handicap et/ou de perte d'autonomie",
  PersonnesEnInsertionSocialeOuProfessionnelle:
    'Personnes en insertion sociale et/ou professionnelle',
  PersonneSituationIlletrisme: 'Personne en situation d’illettrisme',
  PersonneAllophoneOuRefugiesDemandeursAsile:
    'Personne allophone / Réfugiés / demandeurs d’asile',
}

export const beneficiariesOptions = labelsToOptions(beneficiariesLabels)
