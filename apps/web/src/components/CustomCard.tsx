import React, { type ReactNode } from 'react'

const CustomCard = ({
  id,
  title,
  children,
}: {
  id: string
  title: ReactNode
  children: ReactNode
}) => (
  <div className="fr-card fr-card--editable">
    <div className="fr-card__body">
      <div className="fr-card__header fr-card__separator">
        <h2 id={id} className="fr-card__title">
          {title}
        </h2>
      </div>
      <div className="fr-card__content">{children}</div>
    </div>
  </div>
)

export default CustomCard
