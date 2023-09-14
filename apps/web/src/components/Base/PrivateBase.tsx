import React from 'react'
import styles from './PrivateBase.module.css'

const PrivateBase = () => (
  <div className={styles.container} data-testid="private-base-information">
    <h6 className="fr-mb-1w">Base privée</h6>
    Cette base est privée, vous ne pouvez pas consulter son contenu.
  </div>
)

export default PrivateBase
