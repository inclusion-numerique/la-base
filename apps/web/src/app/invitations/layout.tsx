import MinimalFooter from '@app/web/components/MinimalFooter'
import { contentId } from '@app/web/utils/skipLinks'
import { type PropsWithChildren } from 'react'

const PublicLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <div id="skip-links" />
      <main id={contentId} style={{ flex: 1 }}>
        {children}
      </main>
      <MinimalFooter />
    </div>
  )
}

export default PublicLayout
