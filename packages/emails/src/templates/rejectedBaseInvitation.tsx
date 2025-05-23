import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { MjmlColumn, MjmlSection, MjmlText } from '@faire/mjml-react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import React from 'react'

export const rejectedBaseInvitation = {
  text: ({
    memberName,
    baseTitle,
  }: {
    memberName: string
    baseTitle: string
  }): string =>
    `${memberName} a refusé votre invitation à rejoindre la base ${baseTitle}`,
  mjml: ({
    memberName,
    baseTitle,
  }: {
    memberName: string
    baseTitle: string
  }): string =>
    renderToMjml(
      <LayoutWithFooter
        title={`Invitation à la base ${baseTitle} refusée`}
        preview={`${memberName} a refusé votre invitation à rejoindre la base ${baseTitle}`}
      >
        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlText
              fontWeight="700"
              fontSize="28px"
              color="#000091"
              lineHeight="36px"
            >
              {memberName} a refusé votre invitation à rejoindre la base&nbsp;
              {baseTitle}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </LayoutWithFooter>,
    ),
}
