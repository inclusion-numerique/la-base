import { ResourceLicence } from '@prisma/client'

export const licenceWordings = {
  [ResourceLicence.ETALAB_2_0]: {
    title: 'Licence Etalab 2.0',
    hint: "Condition de réutilisation - Attribution de la source d'information",
  },
  [ResourceLicence.CC_BY_SA_4_0]: {
    title: 'Licence CC BY-SA 4.0',
    hint: "Condition de réutilisation - Attribution de la source d'information",
  },
  [ResourceLicence.CC_BY_NC_SA_4_0]: {
    title: 'Licence CC BY-NC-SA 4.0',
    hint: "Condition de réutilisation - Attribution de la source d'information",
  },
  [ResourceLicence.NO_LICENCE]: {
    title: 'Pas de licence - Aucun droit réservé',
    hint: "Aucune licence n'est appliquée à cette ressource",
  },
}
