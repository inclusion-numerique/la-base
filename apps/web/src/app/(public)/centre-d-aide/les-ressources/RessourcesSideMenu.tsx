'use client'

import React from 'react'
import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const RESSOURCES_SECTIONS = [
  {
    id: 'ressources',
    title: 'Une ressource, c’est quoi ?',
  },
  { id: 'creation-ressource', title: 'Création d’une ressource' },
  { id: 'parametre-ressource', title: 'Paramètres d’une ressource' },
]

const RessourcesSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={RESSOURCES_SECTIONS.map(({ id, title }) => ({
          text: title,
          linkProps: { href: `#${id}` },
        }))}
        burgerMenuButtonText="Contenus"
        contentId="bases-content"
        sticky
      />
    </div>
  </div>
)

export default RessourcesSideMenu
