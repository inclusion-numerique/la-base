import Explanations from '@app/emails/components/Explanations'
import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'
import { backgroundColor, brandColor } from '@app/emails/styles'
import {
  MjmlButton,
  MjmlColumn,
  MjmlDivider,
  MjmlSection,
  MjmlSpacer,
  MjmlText,
} from '@faire/mjml-react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import React from 'react'

export const inviteMember = {
  text: ({ url, baseTitle }: { url: string; baseTitle: string }): string =>
    `Pour accepter l'invitation à la base ${baseTitle}, merci d'utiliser le lien suivant :\n${url}\n\n`,
  mjml: ({
    url,
    baseTitle,
    newMember,
    from,
  }: {
    url: string
    newMember: boolean
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
            <MjmlText
              fontWeight="700"
              fontSize="28px"
              color="#000091"
              lineHeight="36px"
            >
              {newMember ? (
                <>
                  Invitation à rejoindre une base sur <br /> Les Bases du
                  numérique d&apos;intérêt général
                </>
              ) : (
                <>Invitation à rejoindre la base {baseTitle}</>
              )}
            </MjmlText>
            <MjmlText fontWeight="700" fontSize="20px" color="#3A3A3A">
              Bonjour,
              <br />
              Vous êtes invité par {from} à rejoindre la base {baseTitle}.
            </MjmlText>
            <MjmlSpacer height="16px" />
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              En rejoignant cette base, vous pourrez :
              <br />
              <br />- Créer & publier des ressources
              <br />- Contribuer à des ressources publiés sur cette base
              <br />- Voir les ressources privées
              <br />- Inviter d&apos;autres membres
            </MjmlText>
            <MjmlSpacer height="32px" />
            <MjmlDivider
              border-width="1px"
              border-style="solid"
              border-color="#DDD"
            />
            <MjmlButton width="100%" href={emailAssetUrl(url)}>
              Accepter l&lsquo;invitation
            </MjmlButton>

            <MjmlButton
              width="100%"
              href={emailAssetUrl(url)}
              backgroundColor="white"
              border="solid 1px #000091"
              color={brandColor}
            >
              Refuser l&lsquo;invitation
            </MjmlButton>
            <MjmlSpacer height="32px" />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor={backgroundColor} />
        <Explanations />
      </LayoutWithFooter>,
    ),
}
