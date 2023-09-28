import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import styles from './Card.module.css'

const Card = ({
  className,
  title,
  description,
  editMode,
  setEditMode,
  children,
  'data-testid': dataTestid,
}: {
  className?: string
  title: string
  description?: string
  editMode?: boolean
  setEditMode?: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  'data-testid'?: string
}) => (
  <div className={classNames(className, styles.card)} data-testid={dataTestid}>
    <div>
      <div className={styles.title}>
        <h5 className="fr-mb-0">{title}</h5>
        {!editMode && setEditMode && (
          <Button
            data-testid="edit-card-button"
            priority="secondary"
            iconId="fr-icon-edit-line"
            title="Modifier"
            onClick={() => setEditMode(true)}
          />
        )}
      </div>
    </div>
    {description && (
      <div className={styles.description}>
        <span className="fr-text--sm fr-mb-0">{description}</span>
      </div>
    )}
    <hr className="fr-mt-4w fr-pb-4w" />
    {children}
  </div>
)

export default Card
