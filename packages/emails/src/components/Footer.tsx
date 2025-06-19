import { emailAssetUrl } from '@app/emails/emailAssetUrl'
import {
  MjmlColumn,
  MjmlDivider,
  MjmlImage,
  MjmlSection,
} from '@faire/mjml-react'
import React from 'react'

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
          alt="Logo ANCT"
        />
      </MjmlColumn>
    </MjmlSection>
  </>
)

export default Footer
