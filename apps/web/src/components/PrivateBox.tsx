import React from 'react'
import styles from './PrivateBox.module.css'

const PrivateBox = ({
  type,
}: {
  type: 'Base' | 'Profil' | 'Ressource' | 'Collection'
}) => (
  <div
    className={styles.container}
    data-testid={`private-${type.toLowerCase()}-box`}
  >
    <h2 className="fr-mb-1w fr-h6">
      {type} privé{type === 'Profil' ? '' : 'e'}
    </h2>
    Ce{type === 'Profil' ? '' : 'tte'} {type.toLowerCase()} est privé
    {type === 'Profil' ? '' : 'e'}, vous ne pouvez pas consulter son contenu.
  </div>
)

export default PrivateBox
