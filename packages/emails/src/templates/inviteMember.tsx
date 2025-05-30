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
              <ul>
                <li>Créer & publier des ressources</li>
                <li>Contribuer à des ressources publiés sur cette base</li>
                <li>Voir les ressources privées</li>
                <li>Inviter d&apos;autres membres</li>
              </ul>
            </MjmlText>
            {newMember && (
              <MjmlText backgroundColor="#EEF2FF">
                <table
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                  style={{
                    borderRadius: '8px',
                    background: '#EEF2FF',
                    padding: '16px 24px',
                  }}
                >
                  <tr>
                    <td style={{ padding: '16px 24px' }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: '18px',
                          color: '#111827',
                          marginBottom: '4px',
                        }}
                      >
                        Créez votre compte sur la plateforme
                      </div>
                      <div
                        style={{
                          fontWeight: 400,
                          fontSize: '16px',
                          color: '#3A3A3A',
                        }}
                      >
                        En acceptant cette invitation, vous serez invité à créer
                        votre compte.
                      </div>
                    </td>
                  </tr>
                </table>
              </MjmlText>
            )}
            <MjmlDivider
              border-width="1px"
              border-style="solid"
              border-color="#DDD"
            />
            <MjmlButton width="100%" href={emailAssetUrl(url)}>
              Voir l&apos;invitation
            </MjmlButton>

            <MjmlSpacer height="32px" />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor={backgroundColor} />
        <Explanations />
      </LayoutWithFooter>,
    ),
}
