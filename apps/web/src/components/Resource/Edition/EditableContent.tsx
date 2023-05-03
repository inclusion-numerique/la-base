import React, { ReactNode } from 'react'
import IconLink from '../../Icon/IconLink'
import styles from './EditableContent.module.css'

const EditableContent = ({ children }: { children: ReactNode }) => (
  <div className={styles.container}>
    <div>{children}</div>
    <IconLink title="Editer" href="/" icon="fr-icon-edit-line" small />
  </div>
)

export default EditableContent
