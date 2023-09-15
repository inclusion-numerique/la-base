import { MjmlAll, MjmlAttributes, MjmlFont, MjmlSpacer } from 'mjml-react'
import React from 'react'
import {
  Mjml,
  MjmlBody,
  MjmlButton,
  MjmlColumn,
  MjmlDivider,
  MjmlHead,
  MjmlImage,
  MjmlPreview,
  MjmlSection,
  MjmlText,
  MjmlTitle,
  renderToMjml,
} from '@luma-team/mjml-react'
import { PublicWebAppConfig } from '@app/web/webAppConfig'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'

const brandColor = '#000091'
const backgroundColor = '#F6F6F6'

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
      <Mjml>
        <MjmlHead>
          <MjmlFont name="Marianne" href={emailAssetUrl('/email/fonts.css')} />
          <MjmlAttributes>
            <MjmlAll fontFamily="Marianne, Helvetica, Arial, sans-serif" />
            <MjmlSection backgroundColor="white" />
            <MjmlButton
              backgroundColor={brandColor}
              borderRadius={0}
              fontSize="16px"
              lineHeight="24px"
              fontWeight={400}
              innerPadding="8px 16px"
            />
            <MjmlText fontSize="16px" lineHeight="24px" fontWeight={400} />
          </MjmlAttributes>
          <MjmlTitle>{`Invitation à la base ${baseTitle}`}</MjmlTitle>
          <MjmlPreview>
            {`Vous avez été invité par ${from} à rejoindre la base ${baseTitle}`}
          </MjmlPreview>
        </MjmlHead>
        <MjmlBody backgroundColor={backgroundColor}>
          {/* Section used for a bit of headroom at the top */}
          <MjmlSection backgroundColor={backgroundColor} />
          {/* Header with logos */}
          <MjmlSection paddingBottom={0}>
            <MjmlColumn width="24%" verticalAlign="middle">
              <MjmlImage
                align="left"
                src={emailAssetUrl('/email/fr.svg')}
                alt="République Française"
              />
            </MjmlColumn>
            <MjmlColumn width="76%" verticalAlign="middle">
              <MjmlText fontWeight={500} fontSize="18px">
                Les Bases du numérique d’intérêt général
              </MjmlText>
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection padding="24px 0">
            <MjmlColumn>
              <MjmlDivider
                border-width="1px"
                border-style="solid"
                border-color="#DDD"
              />
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection paddingTop={0}>
            <MjmlColumn>
              <MjmlText fontWeight={700} fontSize="20px" color="#3A3A3A">
                Bonjour,
                <br />
                <br />
                Vous êtes invité par {from} à rejoindre la Base {baseTitle}.
              </MjmlText>
              <MjmlSpacer height="32px" />
              <MjmlText fontWeight={400} fontSize="16px" color="#3A3A3A">
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
          <MjmlSection>
            <MjmlColumn>
              <MjmlText fontWeight={700} fontSize="28px" color={brandColor}>
                La base, c&lsquo;est quoi ?
              </MjmlText>
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection>
            <MjmlColumn>
              <MjmlText fontSize="18px" fontWeight={400} color="#3A3A3A">
                La plateforme collaborative qui permet de partager toutes les
                ressources & communs numériques au service de l’intérêt général.
              </MjmlText>
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection>
            <MjmlColumn>
              <MjmlButton
                width="100%"
                href={emailAssetUrl('/')}
                backgroundColor="white"
                border="solid 1px #000091"
                color={brandColor}
              >
                Découvrir la base
              </MjmlButton>
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection padding="24px 0">
            <MjmlColumn>
              <MjmlDivider
                border-width="1px"
                border-style="solid"
                border-color="#DDD"
              />
            </MjmlColumn>
          </MjmlSection>
          {/* Footer logos */}
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
                width={160}
                src={emailAssetUrl('/email/logo.svg')}
                alt={PublicWebAppConfig.projectTitle}
              />
            </MjmlColumn>
          </MjmlSection>
          {/* Section used for a bit of padding at the bottom */}
          <MjmlSection backgroundColor={backgroundColor} />
        </MjmlBody>
      </Mjml>,
    ),
}
