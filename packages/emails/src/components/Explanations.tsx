import { emailAssetUrl } from '@app/emails/emailAssetUrl'
import { brandColor } from '@app/emails/styles'
import {
  MjmlButton,
  MjmlColumn,
  MjmlSection,
  MjmlText,
} from '@faire/mjml-react'

const Explanations = () => (
  <>
    <MjmlSection>
      <MjmlColumn>
        <MjmlText
          fontWeight="700"
          fontSize="28px"
          paddingTop="40px"
          color={brandColor}
          lineHeight="36px"
        >
          Les Bases du numérique d’intérêt général, c&lsquo;est quoi ?
        </MjmlText>
        <MjmlText
          fontSize="18px"
          paddingTop="32px"
          fontWeight="400"
          color="#3A3A3A"
        >
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
          Découvrir Les Bases du numérique d’intérêt général
        </MjmlButton>
      </MjmlColumn>
    </MjmlSection>
  </>
)

export default Explanations
