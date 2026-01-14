import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { MjmlColumn, MjmlSection, MjmlText } from '@faire/mjml-react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import React from 'react'

export const rejectedBaseJoinRequest = {
  text: ({
    adminName,
    baseTitle,
  }: {
    adminName: string
    baseTitle: string
  }): string =>
    `${adminName} a refusé votre demande de rejoindre la base ${baseTitle}`,
  mjml: ({
    adminName,
    baseTitle,
  }: {
    adminName: string
    baseTitle: string
  }): string =>
    renderToMjml(
      <LayoutWithFooter
        title={`${adminName} a refusé votre demande de rejoindre la base ${baseTitle}`}
        preview={`${adminName} a refusé votre demande de rejoindre la base ${baseTitle}`}
      >
        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlText
              fontWeight="700"
              fontSize="28px"
              color="#000091"
              lineHeight="36px"
            >
              {adminName} a refusé votre demande de rejoindre la base&nbsp;
              {baseTitle}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </LayoutWithFooter>,
    ),
}
