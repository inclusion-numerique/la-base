import React from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import styles from './EditImageButton.module.css'

const EditImageButton = ({
  onClick,
  title,
  className,
}: {
  onClick: () => void
  title: string
  className: string
}) => (
  <Button
    className={classNames(styles.button, className)}
    onClick={onClick}
    title={title}
    iconId="fr-icon-camera-line"
    priority="tertiary"
  />
)

export default EditImageButton
