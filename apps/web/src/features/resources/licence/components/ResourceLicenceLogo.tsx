import ResourceLicenceCCLogo from '@app/web/features/resources/licence/components/logos/ResourceLicenceCCLogo'
import ResourceLicenceEtalabLogo from '@app/web/features/resources/licence/components/logos/ResourceLicenceEtalabLogo'
import ResourceLicenceNoLicenceLogo from '@app/web/features/resources/licence/components/logos/ResourceLicenceNoLicenceLogo'
import { ResourceLicence } from '@prisma/client'

const ResourceLicenceLogo = ({ licence }: { licence: ResourceLicence }) => {
  const logos = {
    [ResourceLicence.ETALAB_2_0]: ResourceLicenceEtalabLogo,
    [ResourceLicence.CC_BY_SA_4_0]: ResourceLicenceCCLogo,
    [ResourceLicence.CC_BY_NC_SA_4_0]: ResourceLicenceCCLogo,
    [ResourceLicence.NO_LICENCE]: ResourceLicenceNoLicenceLogo,
  }

  const Logo = logos[licence]

  return <Logo />
}

export default ResourceLicenceLogo
