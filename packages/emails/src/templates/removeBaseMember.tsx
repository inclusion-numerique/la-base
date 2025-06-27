import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { MjmlColumn, MjmlSection, MjmlText } from '@faire/mjml-react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import React from 'react'

export const removeBaseMember = {
  text: ({ baseTitle }: { baseTitle: string }): string =>
    `Vous n'êtes plus membre de la base ${baseTitle}`,
  mjml: ({
    userRemovingName,
    baseTitle,
  }: {
    userRemovingName: string
    baseTitle: string
  }): string =>
    renderToMjml(
      <LayoutWithFooter
        title={`Vous n'êtes plus membre de la base ${baseTitle}`}
        preview={`Vous n'êtes plus membre de la base ${baseTitle}`}
      >
        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlText
              fontWeight="700"
              fontSize="28px"
              color="#000091"
              lineHeight="36px"
            >
              {userRemovingName} vous a retiré de la base {baseTitle}.
            </MjmlText>
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              Vous ne pouvez plus contribuer à la base <b>{baseTitle}</b> et à
              toutes les ressources qui y sont rattachées, y compris les
              ressources que vous avez créé et publié sur cette base.
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </LayoutWithFooter>,
    ),
}
