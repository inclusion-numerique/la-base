import IconInSquare from '@app/web/components/IconInSquare'
import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import React, { type PropsWithChildren, type ReactNode } from 'react'

const AdministrationTitle = ({
  icon,
  children,
  actions,
}: PropsWithChildren<{
  icon?: ButtonProps.IconOnly['iconId']
  actions?: ReactNode
}>) => (
  <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-my-6v">
    {!!icon && <IconInSquare iconId={icon} size="medium" />}
    <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france">{children}</h1>
    {!!actions && (
      <>
        <span className="fr-flex-grow-1" />
        <div>{actions}</div>
      </>
    )}
  </div>
)

export default AdministrationTitle
