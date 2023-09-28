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
            text: <div className="wip">Ressource publié dans</div>,
            linkProps: {
              href: '#publication',
            },
          },
          {
            text: <div className="wip">Visibilité de la ressource</div>,
            linkProps: {
              href: '#visibilite',
            },
          },
          {
            text: <div className="wip">Indexation</div>,
            linkProps: {
              href: '#indexation',
            },
          },
          {
            text: 'Contributeurs',
            linkProps: {
              href: '#supprimer',
            },
          },
          {
            text: <div className="wip">Supprimer la ressource</div>,
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
