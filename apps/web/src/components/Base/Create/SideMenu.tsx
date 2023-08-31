import React from 'react'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'

const BaseSideMenu = () => (
  <div className="fr-my-15w">
    <SideMenu
      burgerMenuButtonText="Contenus"
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
            href: '#photo',
          },
        },
      ]}
    />
  </div>
)

export default BaseSideMenu
