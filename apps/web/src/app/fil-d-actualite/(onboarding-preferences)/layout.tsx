import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import { type PropsWithChildren } from 'react'

const NewsFeedLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <SkipLinksPortal />

      <div id="skip-links" />
      <Header user={user} />
      <main id={contentId} style={{ flex: 1 }}>
        {children}
      </main>
      <PublicFooter />
    </div>
  )
}

export default NewsFeedLayout
