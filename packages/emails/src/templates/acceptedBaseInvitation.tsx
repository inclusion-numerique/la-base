import {
  MjmlButton,
  MjmlColumn,
  MjmlDivider,
  MjmlSection,
  MjmlSpacer,
  MjmlText,
} from '@faire/mjml-react'
import React from 'react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'

export const acceptedBaseInvitation = {
  text: ({
    memberName,
    baseTitle,
  }: {
    memberName: string
    baseTitle: string
  }): string =>
    `${memberName} a accepté votre invitation à rejoindre la base ${baseTitle}`,
  mjml: ({
    url,
    memberName,
    baseTitle,
  }: {
    url: string
    memberName: string
    baseTitle: string
  }): string =>
    renderToMjml(
      <LayoutWithFooter
        title={`Demande de rejoindre la base ${baseTitle} acceptée !`}
        preview={`${memberName} a accepté votre invitation à rejoindre la base ${baseTitle}`}
      >
        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlText
              fontWeight="700"
              fontSize="28px"
              color="#000091"
              lineHeight="36px"
            >
              {memberName} a accepté votre demande de rejoindre la base&nbsp;
              {baseTitle}
            </MjmlText>
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              En rejoignant cette base, ce nouveau membre pourra :
              <br />
              <br />
              - Créer & publier des ressources
              <br />
              - Contribuer à des ressources publiés sur cette base
              <br />
              - Voir les ressources privées
              <br />- Inviter d’autres membres
            </MjmlText>
            <MjmlSpacer height="32px" />
            <MjmlDivider
              border-width="1px"
              border-style="solid"
              border-color="#DDD"
            />
            <MjmlButton width="100%" href={emailAssetUrl(url)}>
              Accéder à la base
            </MjmlButton>
          </MjmlColumn>
        </MjmlSection>
      </LayoutWithFooter>,
    ),
}
