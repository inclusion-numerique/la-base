import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import { redirectToUpdatedCguPageIfNeeded } from '@app/web/features/cgu/redirectToUpdatedCguPageIfNeeded'
import { contentId } from '@app/web/utils/skipLinks'
import { type PropsWithChildren } from 'react'

const EditorLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()

  redirectToUpdatedCguPageIfNeeded(user)

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <div id="skip-links" />
      <Header user={user} />
      <main id={contentId} style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  )
}
export default EditorLayout
