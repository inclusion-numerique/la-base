import React from 'react'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'

const ParametersSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg">
    <div>
      <SideMenu
        burgerMenuButtonText="Contenus"
        sticky
        items={[
          {
            text: 'Ressource publié dans',
            linkProps: {
              href: '#publication',
            },
          },
          {
            text: 'Visibilité de la ressource',
            linkProps: {
              href: '#visibilite',
            },
          },
          {
            text: 'Indexation',
            linkProps: {
              href: '#indexation',
            },
          },
          {
            text: 'Contributeurs',
            linkProps: {
              href: '#contributeurs',
            },
          },
          {
            text: 'Supprimer la ressource',
            linkProps: {
              href: '#supprimer',
            },
          },
        ]}
      />
    </div>
  </div>
)

export default ParametersSideMenu
