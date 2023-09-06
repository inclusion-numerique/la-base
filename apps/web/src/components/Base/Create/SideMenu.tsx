import React from 'react'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'

const BaseSideMenu = () => (
  <div className="fr-my-15w fr-hidden fr-unhidden-lg">
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
            text: <div className="wip">Inviter des membres</div>,
            linkProps: {
              href: '#inviter',
            },
          },
          {
            text: <div className="wip">Photo de profil & courverture</div>,
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
