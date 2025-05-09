import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React from 'react'
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
