import {
  MjmlButton,
  MjmlColumn,
  MjmlSection,
  MjmlSpacer,
  MjmlText,
} from '@faire/mjml-react'
import React from 'react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'
import Explanations from '@app/emails/components/Explanations'
import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { backgroundColor } from '@app/emails/styles'

export const inviteMember = {
  text: ({ url, baseTitle }: { url: string; baseTitle: string }): string =>
    // eslint-disable-next-line no-irregular-whitespace
    `Pour accepter l'invitation à la base ${baseTitle}, merci d'utiliser le lien suivant :\n${url}\n\n`,
  mjml: ({
    url,
    baseTitle,
    from,
  }: {
    url: string
    baseTitle: string
    from: string
  }): string =>
    renderToMjml(
      <LayoutWithFooter
        title={`Invitation à la base ${baseTitle}`}
        preview={`Vous avez été invité par ${from} à rejoindre la base ${baseTitle}`}
      >
        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlText fontWeight="700" fontSize="20px" color="#3A3A3A">
              Bonjour,
              <br />
              <br />
              Vous êtes invité par {from} à rejoindre la base {baseTitle}.
            </MjmlText>
            <MjmlSpacer height="16px" />
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              En rejoignant cette base, vous pourrez :
              <br />
              <br />
              - Créer & publier des ressources
              <br />
              - Contribuer à des ressources publiés sur cette base
              <br />- Inviter d’autres membres
            </MjmlText>
            <MjmlSpacer height="32px" />
            <MjmlButton width="100%" href={emailAssetUrl(url)}>
              Accepter l&lsquo;invitation
            </MjmlButton>
            <MjmlSpacer height="32px" />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor={backgroundColor} />
        <Explanations />
      </LayoutWithFooter>,
    ),
}
