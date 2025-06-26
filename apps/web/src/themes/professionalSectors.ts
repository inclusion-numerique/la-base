import { labelsToOptions } from '@app/ui/components/Form/utils/options'
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
