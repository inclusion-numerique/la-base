import ResourceLicenceBYSymbol from '@app/web/features/resources/licence/components/symbols/ResourceLicenceBYSymbol'
import ResourceLicenceCCSymbol from '@app/web/features/resources/licence/components/symbols/ResourceLicenceCCSymbol'
import ResourceLicenceEtalabSymbol from '@app/web/features/resources/licence/components/symbols/ResourceLicenceEtalabSymbol'
import ResourceLicenceNCSymbol from '@app/web/features/resources/licence/components/symbols/ResourceLicenceNCSymbol'
import ResourceLicenceNoLicenceSymbol from '@app/web/features/resources/licence/components/symbols/ResourceLicenceNoLicenceSymbol'
import ResourceLicenceSASymbol from '@app/web/features/resources/licence/components/symbols/ResourceLicenceSASymbol'
import { ResourceLicence } from '@prisma/client'

export const licenceInformations = {
  [ResourceLicence.ETALAB_2_0]: {
    symbols: <ResourceLicenceEtalabSymbol />,
    url: 'https://www.etalab.gouv.fr/licence-ouverte-open-licence/',
    title: 'Licence Etalab 2.0',
    hint: "Attribution de la source d'information",
  },
  [ResourceLicence.CC_BY_SA_4_0]: {
    symbols: (
      <div className="fr-flex fr-flex-gap-2v">
        <ResourceLicenceCCSymbol />
        <ResourceLicenceBYSymbol />
        <ResourceLicenceSASymbol />
      </div>
    ),
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    title: 'Licence CC BY-SA 4.0',
    hint: 'Attribution, partage dans les mêmes conditions',
  },
  [ResourceLicence.CC_BY_NC_SA_4_0]: {
    symbols: (
      <div className="fr-flex fr-flex-gap-2v">
        <ResourceLicenceCCSymbol />
        <ResourceLicenceBYSymbol />
        <ResourceLicenceNCSymbol />
        <ResourceLicenceSASymbol />
      </div>
    ),
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr',
    title: 'Licence CC BY-NC-SA 4.0',
    hint: 'Attribution, non commercial, partage dans les mêmes conditions',
  },
  [ResourceLicence.NO_LICENCE]: {
    symbols: <ResourceLicenceNoLicenceSymbol />,
    url: null,
    title: 'Pas de licence',
    hint: 'Domaine public, libre de restrictions de droits d’auteur',
  },
}
