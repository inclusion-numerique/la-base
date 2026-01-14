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

export const accountDeleted = {
  text: ({ url }: { url: string }): string =>
    `Bonjour,

Malgré nos relances au cours de ces derniers mois, vous n'avez pas manifesté le souhait de conserver ce compte. Votre compte et vos informations personnelles ont donc été définitivement supprimés après 12 mois d'inactivité.
Si vous avez créé des ressources publiques, celles-ci resteront en ligne sur la plateforme mais ne seront plus liées à ce compte.
💡 Vous pouvez bien sûr revenir à tout moment : il vous suffit de créer un nouveau compte pour rejoindre Les Bases.

Je recrée mon compte : ${url}

Besoin d’aide ? Contactez notre équipe en répondant à cet email ou consultez le centre d’aide.`,
  mjml: ({ url }: { url: string }): string =>
    renderToMjml(
      <LayoutWithFooter
        title="Votre compte a ete supprime"
        preview="Votre compte Les Bases a été supprimé après 12 mois d'inactivité."
      >
        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlText
              fontWeight="700"
              fontSize="28px"
              color={brandColor}
              lineHeight="36px"
            >
              Votre compte a été supprimé
            </MjmlText>
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              Bonjour,
            </MjmlText>
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              Malgré nos relances au cours de ces derniers mois, vous
              n&apos;avez pas manifesté le souhait de conserver ce compte. Votre
              compte et vos informations personnelles ont donc été{' '}
              <strong>
                définitivement supprimés après 12 mois d&apos;inactivité.
              </strong>
            </MjmlText>
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              Si vous avez créé des ressources publiques, celles-ci resteront en
              ligne sur la plateforme mais ne seront plus liées à ce compte.
            </MjmlText>
            <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
              💡 Vous pouvez bien sûr revenir à tout moment : il vous suffit de
              créer un nouveau compte pour rejoindre Les Bases.
            </MjmlText>
            <MjmlSpacer height="16px" />
            <MjmlButton href={url}>Je recrée mon compte</MjmlButton>
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
