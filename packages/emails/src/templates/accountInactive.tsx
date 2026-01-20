import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { brandColor } from '@app/emails/styles'
import {
  MjmlButton,
  MjmlColumn,
  MjmlSection,
  MjmlSpacer,
  MjmlText,
} from '@faire/mjml-react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import React from 'react'

export const accountInactive = {
  text: ({
    firstname,
    email,
    url,
  }: {
    firstname: string
    email: string
    url: string
  }): string =>
    `Bonjour ${firstname},

Votre compte ${email} sur Les Bases est sans activité depuis plus de 10 mois. Sans action de votre part, votre compte et vos informations personnelles seront définitivement supprimés dans 60 jours.
Si vous souhaitez conserver votre compte, veuillez vous connecter à votre compte sur Les Bases.

Je me connecte : ${url}

Besoin d’aide ? Contactez notre équipe en répondant à cet email ou consultez le centre d’aide.`,
  mjml: ({
    firstname,
    email,
    url,
  }: {
    firstname: string
    email: string
    url: string
  }): string =>
    renderToMjml(
      <LayoutWithFooter
        title="Votre compte est inactif"
        preview="Votre compte Les Bases est sans activité depuis plus de 10 mois."
      >
        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlText
              fontWeight="700"
              fontSize="28px"
              color={brandColor}
              lineHeight="36px"
            >
              Votre compte est inactif
            </MjmlText>
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              Bonjour {firstname},
            </MjmlText>
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              Votre compte <strong>{email}</strong> sur Les Bases est sans
              activité depuis plus de 10 mois. Sans action de votre part, votre
              compte et vos informations personnelles{' '}
              <strong>seront définitivement supprimés dans 60 jours.</strong>
            </MjmlText>
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              Si vous souhaitez conserver votre compte,{' '}
              <strong>
                veuillez vous connecter à votre compte sur Les Bases.
              </strong>
            </MjmlText>
            <MjmlSpacer height="16px" />
            <MjmlButton href={url}>Je me connecte</MjmlButton>
            <MjmlSpacer height="16px" />
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              Besoin d’aide ? Contactez notre équipe en répondant à cet email ou
              consultez le{' '}
              <a href="https://docs.numerique.gouv.fr/docs/a4351149-5e64-403b-a93f-2ac86e4c1043/">
                centre d’aide
              </a>
              .
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </LayoutWithFooter>,
    ),
}
