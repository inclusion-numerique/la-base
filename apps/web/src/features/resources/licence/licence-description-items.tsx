import ResourceLicenceBYSymbol from '@app/web/features/resources/licence/components/symbols/ResourceLicenceBYSymbol'
import ResourceLicenceNCSymbol from '@app/web/features/resources/licence/components/symbols/ResourceLicenceNCSymbol'
import ResourceLicenceSASymbol from '@app/web/features/resources/licence/components/symbols/ResourceLicenceSASymbol'
import { ResourceLicence } from '@prisma/client'

const BY = {
  label: 'BY',
  description:
    ' -  Les réutilisateurs peuvent partager et adapter votre travail à condition qu’ils vous en attribuent le crédit.',
  symbol: <ResourceLicenceBYSymbol />,
}
const SA = {
  label: 'SA',
  description:
    ' - Les réutilisateurs doivent distribuer les dérivés de votre travail sous la même licence.',
  symbol: <ResourceLicenceSASymbol />,
}

const NC = {
  label: 'NC',
  description:
    ' - Les réutilisateurs peuvent utiliser votre travail à des fins non commerciales uniquement.',
  symbol: <ResourceLicenceNCSymbol />,
}

export const licenceDescriptionItems = {
  [ResourceLicence.ETALAB_2_0]: null,
  [ResourceLicence.NO_LICENCE]: null,
  [ResourceLicence.CC_BY_SA_4_0]: {
    link: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    items: [BY, SA],
    name: 'CC BY-SA 4.0',
  },
  [ResourceLicence.CC_BY_NC_SA_4_0]: {
    link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr',
    items: [BY, NC, SA],
    name: 'CC BY-NC-SA 4.0',
  },
}
