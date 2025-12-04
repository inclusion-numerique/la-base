import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import {
  MjmlColumn,
  MjmlDivider,
  MjmlSection,
  MjmlText,
} from '@faire/mjml-react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import React from 'react'

export const reportedResourceModeration = {
  text: ({
    resourceName,
    creatorName,
    moderatorName,
    moderatorEmail,
  }: {
    resourceName: string
    creatorName: string
    moderatorName: string
    moderatorEmail: string
  }) =>
    `Bonjour ${creatorName},

Votre ressource ${resourceName} a été signalée, puis supprimée par l'un des modérateurs de la plateforme, car elle ne respecte pas les conditions à suivre pour publier une ressource, que vous pouvez retrouver dans notre charte.

Si vous estimez que cette décision n'est pas fondée, n'hésitez pas à nous fournir plus d'informations ou de contexte. Nous sommes ouverts à une discussion pour résoudre cette situation de manière équitable.

Pour toute question, contactez-nous à ${moderatorEmail}.

Merci de votre compréhension.

Bien cordialement,

${moderatorName}
Modérateur,
Les Bases du numérique d'intérêt général
${moderatorEmail}`,

  mjml: ({
    resourceName,
    creatorName,
    moderatorName,
    moderatorEmail,
  }: {
    resourceName: string
    creatorName: string
    moderatorName: string
    moderatorEmail: string
  }) =>
    renderToMjml(
      <LayoutWithFooter
        title={`Signalement et suppression de votre ressource ${resourceName}`}
        preview="Votre ressource a été signalée et supprimée par un modérateur"
      >
        <MjmlSection>
          <MjmlColumn>
            <MjmlText
              fontSize="28px"
              lineHeight="36px"
              fontWeight="700"
              color="#000091"
            >
              Signalement et suppression de votre ressource {resourceName}
            </MjmlText>
            <MjmlText fontSize="16px" fontWeight="400" color="#3A3A3A">
              Bonjour {creatorName},
            </MjmlText>
            <MjmlText fontSize="16px" fontWeight="400" color="#3A3A3A">
              Votre ressource <strong>{resourceName}</strong> a été signalée,
              puis supprimée par l'un des modérateurs de la plateforme, car elle
              ne respecte pas les conditions à suivre pour publier une
              ressource, que vous pouvez retrouver dans notre charte.
            </MjmlText>
            <MjmlText
              fontSize="16px"
              fontWeight="400"
              lineHeight="24px"
              color="#3A3A3A"
            >
              Si vous estimez que cette décision n'est pas fondée, n'hésitez pas
              à nous fournir plus d'informations ou de contexte. Nous sommes
              ouverts à une discussion pour résoudre cette situation de manière
              équitable.
            </MjmlText>
            <MjmlText
              fontSize="16px"
              fontWeight="400"
              lineHeight="24px"
              color="#3A3A3A"
            >
              Pour toute question, contactez-nous à{' '}
              <strong>{moderatorEmail}</strong>.
            </MjmlText>
            <MjmlText
              fontSize="16px"
              fontWeight="400"
              lineHeight="24px"
              color="#3A3A3A"
            >
              Merci de votre compréhension.
            </MjmlText>
            <MjmlText
              fontSize="16px"
              fontWeight="400"
              lineHeight="24px"
              color="#3A3A3A"
            >
              Bien cordialement,
            </MjmlText>
            <MjmlDivider borderColor="#E5E5E5" borderWidth="1px" />
            <MjmlText
              fontSize="16px"
              fontWeight="700"
              color="#3A3A3A"
              backgroundColor="#EEF2FF"
              paddingTop="16px"
              paddingBottom="4px"
              paddingLeft="16px"
              paddingRight="16px"
            >
              {moderatorName}
            </MjmlText>
            <MjmlText
              fontSize="16px"
              fontWeight="400"
              color="#3A3A3A"
              backgroundColor="#EEF2FF"
              paddingTop="0px"
              paddingBottom="4px"
              paddingLeft="16px"
              paddingRight="16px"
            >
              Modérateur, Les Bases du numérique d'intérêt général
            </MjmlText>
            <MjmlText
              fontSize="16px"
              fontWeight="400"
              color="#000091"
              backgroundColor="#EEF2FF"
              paddingTop="0px"
              paddingBottom="16px"
              paddingLeft="16px"
              paddingRight="16px"
            >
              {moderatorEmail}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </LayoutWithFooter>,
    ),
}
