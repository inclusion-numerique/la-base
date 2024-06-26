'use client'

import React from 'react'
import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const BASES_SECTIONS = [
  {
    id: 'base',
    title: 'Une base, c’est quoi ?',
  },
  { id: 'utiliser-base', title: 'Comment utiliser une base ?' },
  { id: 'creer-base', title: 'Créer une base' },
  { id: 'membre-base', title: 'Gérer les membres d’une base' },
  { id: 'infos-base', title: 'Informations & paramètres d’une base' },
]

const BasesSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={BASES_SECTIONS.map(({ id, title }) => ({
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

export default BasesSideMenu
