import { PropsWithChildren } from 'react'
import PublicHeader from '@app/web/app/(public)/PublicHeader'
import PublicFooter from '@app/web/app/(public)/PublicFooter'

const PublicLayout = ({ children }: PropsWithChildren) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
    <PublicHeader />
    <div style={{ flex: 1 }}>
      <div className="fr-container">{children}</div>
    </div>
    <PublicFooter />
  </div>
)

export default PublicLayout
