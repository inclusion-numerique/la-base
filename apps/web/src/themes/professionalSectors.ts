import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { RiIconClassName } from '@codegouvfr/react-dsfr'
import { ProfessionalSector } from '@prisma/client'

export const professionalSectorsLabels: {
  [professionalSector in ProfessionalSector]: string
} = {
  ActeursPublics: 'Acteurs publics',
  ActeursPrivesEtAssociatifs: 'Acteurs privés et associatifs',
  AidantsEtMediateursNumeriques: 'Aidants et médiateurs numériques',
  AutresProfessionnels: 'Autres professionnels',
}

export const professionalSectorsOptions = labelsToOptions(
  professionalSectorsLabels,
  {
    hints: {
      ActeursPublics:
        'Élus, collectivités, Administrations & établissements publics...',
      ActeursPrivesEtAssociatifs:
        "Entreprises, Associations & acteurs de l'ESS...",
      AidantsEtMediateursNumeriques:
        'Aidants numériques, médiateurs numériques,travailleurs sociaux, bénévoles...',
      AutresProfessionnels:
        'Enseignants & professionnels de la formation, autres...',
    },
  },
)

export const professionalSectorsIcon: Record<
  ProfessionalSector,
  RiIconClassName
> = {
  ActeursPublics: 'ri-government-line',
  ActeursPrivesEtAssociatifs: 'ri-building-line',
  AidantsEtMediateursNumeriques: 'ri-user-heart-line',
  AutresProfessionnels: 'ri-group-line',
}
