import React from 'react'
import classNames from 'classnames'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import styles from './SideMenu.module.css'

const BaseSideMenu = () => (
  <div className={classNames(styles.container, 'fr-hidden', 'fr-unhidden-lg')}>
    <div>
      <SideMenu
        burgerMenuButtonText="Contenus"
        sticky
        items={[
          {
            text: 'Informations',
            linkProps: {
              href: '#informations',
            },
          },
          {
            text: 'Contacts',
            linkProps: {
              href: '#contacts',
            },
          },
          {
            text: 'Visibilité de la base',
            linkProps: {
              href: '#visibilite',
            },
          },
          {
            text: 'Inviter des membres',
            linkProps: {
              href: '#inviter',
            },
          },
          {
            text: 'Photo de profil & courverture',
            linkProps: {
              href: '#photos',
            },
          },
        ]}
      />
    </div>
  </div>
)

export default BaseSideMenu
