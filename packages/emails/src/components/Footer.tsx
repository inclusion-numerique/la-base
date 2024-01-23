import {
  MjmlColumn,
  MjmlDivider,
  MjmlImage,
  MjmlSection,
} from '@faire/mjml-react'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import React from 'react'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'

const Footer = ({ padding = '0 0' }: { padding?: string | number }) => (
  <>
    <MjmlSection padding={padding}>
      <MjmlColumn>
        <MjmlDivider
          border-width="1px"
          border-style="solid"
          border-color="#DDD"
        />
      </MjmlColumn>
    </MjmlSection>
    <MjmlSection paddingBottom="8px">
      <MjmlColumn width="24%" verticalAlign="middle">
        <MjmlImage
          align="left"
          src={emailAssetUrl('/email/fr.svg')}
          alt="République Française"
        />
      </MjmlColumn>
      <MjmlColumn width="76%" verticalAlign="middle">
        <MjmlImage
          align="left"
          width={200}
          src={emailAssetUrl('/email/logo_anct.svg')}
          alt={PublicWebAppConfig.projectTitle}
        />
      </MjmlColumn>
    </MjmlSection>
  </>
)

export default Footer
