import classNames from 'classnames'
import type { PropsWithChildren, ReactNode } from 'react'

const AdministrationInfoCard = ({
  title,
  actions,
  children,
  className,
}: PropsWithChildren<{
  title?: ReactNode
  actions?: ReactNode
  className?: string
}>) => (
  <div
    className={classNames(
      'fr-border-radius--8 fr-border  fr-pt-8v fr-px-8v fr-pb-10v fr-mb-6v',
      className,
    )}
  >
    {(title || actions) && (
      <span className="fr-flex fr-justify-content-space-between fr-flex-wrap fr-items-center fr-mb-4v fr-flex-gap-4v">
        {title && <h2 className="fr-h6 fr-mb-0">{title}</h2>}
        {actions}
      </span>
    )}
    {children}
  </div>
)

export default AdministrationInfoCard
