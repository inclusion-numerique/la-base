import React, { PropsWithChildren, ReactNode } from 'react'
import {
  Mjml,
  MjmlBody,
  MjmlColumn,
  MjmlDivider,
  MjmlImage,
  MjmlSection,
  MjmlText,
} from '@faire/mjml-react'
import Head from '@app/emails/components/Head'
import { backgroundColor } from '@app/emails/styles'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'
import Footer from '@app/emails/components/Footer'

/**
 * With headerLogoOnly the logo will be centered and you can include title in children
 */
const LayoutWithFooter = ({
  children,
  headerLogoOnly = false,
  title,
  preview,
}: PropsWithChildren<{
  headerLogoOnly?: boolean
  title: ReactNode
  preview: ReactNode
}>) => (
  <Mjml>
    <Head title={title} preview={preview} />
    <MjmlBody backgroundColor={backgroundColor}>
      {/* Section used for a bit of headroom at the top */}
      <MjmlSection backgroundColor={backgroundColor} />
      {/* Header with logos */}
      {headerLogoOnly ? (
        <MjmlSection paddingBottom="16px">
          <MjmlColumn width="20%" verticalAlign="middle">
            <MjmlImage
              align="center"
              src={emailAssetUrl('/email/logo_lesbases.svg')}
              alt="Logo Les Bases du numérique d’intérêt général"
            />
          </MjmlColumn>
        </MjmlSection>
      ) : (
        <>
          <MjmlSection paddingBottom={0}>
            <MjmlColumn width="20%" verticalAlign="middle">
              <MjmlImage
                align="left"
                src={emailAssetUrl('/email/logo_lesbases.svg')}
                alt="Logo Les Bases du numérique d’intérêt général"
              />
            </MjmlColumn>
            <MjmlColumn width="80%" verticalAlign="middle">
              <MjmlText fontWeight="500" fontSize="18px">
                Les Bases du numérique d’intérêt général
              </MjmlText>
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection padding="8px 0">
            <MjmlColumn>
              <MjmlDivider
                border-width="1px"
                border-style="solid"
                border-color="#DDD"
              />
            </MjmlColumn>
          </MjmlSection>
        </>
      )}
      {children}
      <Footer />
      {/* Section used for a bit of padding at the bottom */}
      <MjmlSection backgroundColor={backgroundColor} />
    </MjmlBody>
  </Mjml>
)

export default LayoutWithFooter
