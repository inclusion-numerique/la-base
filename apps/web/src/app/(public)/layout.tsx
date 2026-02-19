import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import RouteChangeFocusHandler from '@app/web/components/RouteChangeFocusHandler'
import { redirectToUpdatedCguPageIfNeeded } from '@app/web/features/cgu/redirectToUpdatedCguPageIfNeeded'
import { redirectToNewsFeedOnboarding } from '@app/web/features/fil-d-actualite/redirectToNewsFeedOnboarding'
import { contentId } from '@app/web/utils/skipLinks'
import { type PropsWithChildren } from 'react'

const PublicLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()
  redirectToUpdatedCguPageIfNeeded(user)
  redirectToNewsFeedOnboarding(user)

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <div id="skip-links" />
      <Header user={user} />
      <RouteChangeFocusHandler />
      <main role="main" id={contentId} style={{ flex: 1 }}>
        {children}
      </main>
      <PublicFooter />
    </div>
  )
}

export default PublicLayout
