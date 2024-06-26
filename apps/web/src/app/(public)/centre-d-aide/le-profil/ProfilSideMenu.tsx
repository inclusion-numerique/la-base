'use client'

import React from 'react'
import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const PROFIL_SECTIONS = [
  {
    id: 'un-profil',
    title: 'Un profil... c’est quoi ?',
  },
  { id: 'utiliser', title: 'Comment utiliser votre profil ?' },
  { id: 'info-profil', title: 'Informations & paramètres du profil' },
]

const ProfilSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={PROFIL_SECTIONS.map(({ id, title }) => ({
          text: title,
          linkProps: { href: `#${id}` },
        }))}
        burgerMenuButtonText="Contenus"
        contentId="commencer-content"
        sticky
      />
    </div>
  </div>
)

export default ProfilSideMenu
