import React, { PropsWithChildren } from 'react'

const PublicLayout = ({ children }: PropsWithChildren) => (
  <div style={{ flex: 1 }}>
    <div className="fr-container">{children}</div>
  </div>
)

export default PublicLayout
