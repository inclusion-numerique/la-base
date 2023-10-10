import React, { PropsWithChildren } from 'react'

const PublicLayout = ({ children }: PropsWithChildren) => (
  <div className="fr-container">{children}</div>
)

export default PublicLayout
