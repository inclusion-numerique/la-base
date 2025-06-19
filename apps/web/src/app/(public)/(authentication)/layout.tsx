import type { PropsWithChildren } from 'react'

const ConnexionLayout = ({ children }: PropsWithChildren) => (
  <div
    className="fr-flex fr-direction-column fr-background-alt--blue-ecume"
    style={{ minHeight: '100%' }}
  >
    <div className="fr-container fr-container--narrow fr-mb-20v">
      {children}
    </div>
  </div>
)

export default ConnexionLayout
