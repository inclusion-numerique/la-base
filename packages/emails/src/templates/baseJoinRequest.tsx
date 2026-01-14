import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'
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

export const baseJoinRequest = {
  text: ({
    url,
    applicant,
    baseTitle,
  }: {
    url: string
    baseTitle: string
    applicant: {
      name?: string
      firstName?: string
      lastName?: string
      email: string
      slug: string
    }
  }): string =>
    `Pour accepter la demande de ${
      applicant.name
        ? applicant.name
        : applicant.firstName && applicant.lastName
          ? `${applicant.firstName} ${applicant.lastName}`
          : applicant.email
    } pour rejoindre la base ${baseTitle}, merci d'utiliser le lien suivant :\n${url}\n\n`,
  mjml: ({
    url,
    baseTitle,
    applicant,
    profileUrl,
  }: {
    url: string
    applicant: {
      name?: string
      firstName?: string
      lastName?: string
      email: string
      slug: string
    }
    profileUrl: string
    baseTitle: string
  }): string =>
    renderToMjml(
      <LayoutWithFooter
        title={`${
          applicant.firstName && applicant.lastName
            ? `${applicant.firstName} ${applicant.lastName}`
            : applicant.name || applicant.email
        } demande à rejoindre la base ${baseTitle}`}
        preview={`${
          applicant.firstName && applicant.lastName
            ? `${applicant.firstName} ${applicant.lastName}`
            : applicant.name || applicant.email
        } demande à rejoindre la base ${baseTitle}`}
      >
        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlText
              fontWeight="700"
              fontSize="28px"
              color="#000091"
              lineHeight="36px"
            >
              {applicant.firstName && applicant.lastName
                ? `${applicant.firstName} ${applicant.lastName}`
                : applicant.name || applicant.email}{' '}
              demande à rejoindre la base {baseTitle}
            </MjmlText>

            <MjmlSpacer height="16px" />
          </MjmlColumn>
        </MjmlSection>

        <MjmlSection
          backgroundColor="#FFFFFF"
          padding="16px"
          borderTop="1px solid #DDD"
          borderBottom="1px solid #DDD"
        >
          <MjmlColumn width="70%">
            <MjmlText
              fontWeight="600"
              fontSize="16px"
              color="#161616"
              paddingBottom="0"
            >
              {applicant.firstName && applicant.lastName
                ? `${applicant.firstName} ${applicant.lastName}`
                : applicant.name || 'Nom non renseigné'}
            </MjmlText>
            <MjmlText
              fontWeight="400"
              fontSize="14px"
              color="#666666"
              paddingTop="0"
            >
              {applicant.email}
            </MjmlText>
          </MjmlColumn>
          <MjmlColumn width="30%">
            <MjmlButton
              backgroundColor="transparent"
              color="#000091"
              fontSize="14px"
              fontWeight="400"
              innerPadding="8px 12px"
              border="1px solid #000091"
              borderRadius="0"
              cssClass="secondary-button"
              align="right"
              href={emailAssetUrl(profileUrl)}
            >
              Voir son profil
            </MjmlButton>
          </MjmlColumn>
        </MjmlSection>

        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlSpacer height="24px" />

            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              En rejoignant cette base,{' '}
              {applicant.firstName && applicant.lastName
                ? `${applicant.firstName} ${applicant.lastName}`
                : applicant.name || applicant.email}{' '}
              pourra :
              <br />
              <ul>
                <li>Créer & publier des ressources via cette base</li>
                <li>Contribuer à des ressources publiés sur cette base</li>
                <li>Voir les ressources privées</li>
                <li>Inviter d&apos;autres membres</li>
              </ul>
            </MjmlText>
            <MjmlDivider
              border-width="1px"
              border-style="solid"
              border-color="#DDD"
            />
            <MjmlButton width="100%" href={emailAssetUrl(url)}>
              Voir l&apos;invitation
            </MjmlButton>
          </MjmlColumn>
        </MjmlSection>
      </LayoutWithFooter>,
    ),
}
