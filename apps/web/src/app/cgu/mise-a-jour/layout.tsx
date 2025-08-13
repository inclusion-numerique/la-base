import MinimalFooter from '@app/web/components/MinimalFooter'
import { type PropsWithChildren } from 'react'

const CguMiseAJourLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <div id="skip-links" />
      <div style={{ flex: 1 }}>
        <div
          className="fr-flex fr-direction-column fr-background-alt--blue-ecume"
          style={{ minHeight: '100%' }}
        >
          <div className="fr-container fr-mb-20v">{children}</div>
        </div>
      </div>
      <MinimalFooter />
    </div>
  )
}

export default CguMiseAJourLayout
