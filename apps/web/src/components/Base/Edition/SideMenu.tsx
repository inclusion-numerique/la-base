import React from 'react'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'

const BaseSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg">
    <div>
      <SideMenu
        burgerMenuButtonText="Contenus"
        sticky
        items={[
          {
            text: 'Informations de la base',
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
            text: 'Supprimer la base',
            linkProps: {
              href: '#supprimer',
            },
          },
        ]}
      />
    </div>
  </div>
)

export default BaseSideMenu
