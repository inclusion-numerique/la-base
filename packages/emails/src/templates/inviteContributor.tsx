import Explanations from '@app/emails/components/Explanations'
import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'
import { backgroundColor } from '@app/emails/styles'
import {
  MjmlButton,
  MjmlColumn,
  MjmlSection,
  MjmlSpacer,
  MjmlText,
} from '@faire/mjml-react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import React from 'react'

export const inviteContributor = {
  text: ({ resourceTitle }: { resourceTitle: string }): string =>
    `Vous êtes invité à contribuer à la ressource ${resourceTitle}`,
  mjml: ({
    url,
    resourceTitle,
    from,
  }: {
    url: string
    resourceTitle: string
    from: string
  }): string =>
    renderToMjml(
      <LayoutWithFooter
        title={`Invitation à la ressource ${resourceTitle}`}
        preview={`Vous avez été invité par ${from} à contribuer à la ressource ${resourceTitle}`}
      >
        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlText fontWeight="700" fontSize="20px" color="#3A3A3A">
              Bonjour,
              <br />
              <br />
              Vous êtes invité par {from} à contribuer à la ressource{' '}
              {resourceTitle}.
            </MjmlText>
            <MjmlSpacer height="32px" />
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              Cette invitation à contribuer à cette ressource vous permet :
              <br />
              <br />- D’apporter des modifications/améliorations à cette
              ressource
              <br />- Modifier les paramètres de publication de cette ressource
              <br />- Inviter d’autres contributeurs
            </MjmlText>
            <MjmlSpacer height="32px" />
            <MjmlButton width="100%" href={emailAssetUrl(url)}>
              Voir la ressource
            </MjmlButton>
            <MjmlSpacer height="32px" />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor={backgroundColor} />
        <Explanations />
      </LayoutWithFooter>,
    ),
}
