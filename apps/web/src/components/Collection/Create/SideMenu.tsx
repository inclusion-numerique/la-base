import React from 'react'
import classNames from 'classnames'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import styles from './SideMenu.module.css'

const CollectionSideMenu = () => (
  <div className={classNames(styles.container, 'fr-hidden', 'fr-unhidden-lg')}>
    <div>
      <SideMenu
        burgerMenuButtonText="Contenus"
        sticky
        items={[
          {
            text: 'Informations de la collection',
            linkProps: {
              href: '#informations',
            },
          },
          {
            text: 'Aperçu de la collection',
            linkProps: {
              href: '#apercu',
            },
          },
          {
            text: 'Visibilité',
            linkProps: {
              href: '#visibilite',
            },
          },
        ]}
      />
    </div>
  </div>
)

export default CollectionSideMenu
