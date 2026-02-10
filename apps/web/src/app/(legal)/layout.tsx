import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import { contentId } from '@app/web/utils/skipLinks'
import { type PropsWithChildren } from 'react'

/**
 * The (legal) pages are always accessible, even if the
 * user is logged in without having accepted the CGU
 */
const LegalLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <div id="skip-links" />
      <Header user={user} />
      <main id={contentId} style={{ flex: 1 }}>
        {children}
      </main>
      <PublicFooter />
    </div>
  )
}

export default LegalLayout
