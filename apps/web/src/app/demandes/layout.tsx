import MinimalFooter from '@app/web/components/MinimalFooter'
import { type PropsWithChildren } from 'react'

const PublicLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <div id="skip-links" />
      <div style={{ flex: 1 }}>{children}</div>
      <MinimalFooter />
    </div>
  )
}

export default PublicLayout
