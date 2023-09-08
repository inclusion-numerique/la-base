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
            text: <div className="wip">Informations de la base</div>,
            linkProps: {
              href: '#informations',
            },
          },
          {
            text: <div className="wip">Contacts</div>,
            linkProps: {
              href: '#contacts',
            },
          },
          {
            text: <div className="wip">Visibilité de la base</div>,
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
