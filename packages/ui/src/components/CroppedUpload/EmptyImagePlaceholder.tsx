import React, { PropsWithChildren, ReactNode } from 'react'

const EmptyImagePlaceholder = ({
  height,
  ratio,
  round,
  emptyChildren,
}: PropsWithChildren<{
  height: number
  ratio: number
  round?: boolean | 'quarter'
  emptyChildren?: ReactNode
}>) =>
  emptyChildren && (
    <div
      className={`fr-mx-auto fr-mb-2w fr-overflow-hidden ${round === true && 'fr-border-radius-circle'} ${round === 'quarter' && 'fr-border-radius-rounded'}`}
      style={{ height, width: height * ratio }}
    >
      {emptyChildren}
    </div>
  )

export default EmptyImagePlaceholder
