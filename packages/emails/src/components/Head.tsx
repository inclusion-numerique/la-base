import { emailAssetUrl } from '@app/emails/emailAssetUrl'
import { brandColor } from '@app/emails/styles'
import {
  MjmlAll,
  MjmlAttributes,
  MjmlButton,
  MjmlFont,
  MjmlHead,
  MjmlPreview,
  MjmlSection,
  MjmlText,
  MjmlTitle,
} from '@faire/mjml-react'
import React, { ReactNode } from 'react'

const Head = ({ preview, title }: { title: ReactNode; preview: ReactNode }) => (
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
        fontWeight="400"
        innerPadding="8px 16px"
      />
      <MjmlText fontSize="16px" lineHeight="24px" fontWeight="400" />
    </MjmlAttributes>
    <MjmlTitle>{title}</MjmlTitle>
    <MjmlPreview>{preview}</MjmlPreview>
  </MjmlHead>
)

export default Head
