import { ReactNode } from 'react'

const BlockWithLabel = ({
  label,
  canDisplay,
  children,
}: {
  label: ReactNode
  canDisplay: string | boolean | null
  children: ReactNode
}) =>
  canDisplay && (
    <div className="fr-mb-2w">
      <div className="fr-text-mention--grey">{label}</div>
      {children}
    </div>
  )

export default BlockWithLabel
