'use client'

import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'
import React from 'react'

const COMMENCER_SECTIONS = [
  {
    id: 'apropos',
    title: 'Les Bases du numérique d’intérêt général, de quoi parle-t-on ?',
  },
  { id: 'compte', title: 'Créer son compte & se connecter' },
  { id: 'profil', title: 'Profitez dès à présent de votre profil' },
]

const CommencerSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={COMMENCER_SECTIONS.map(({ id, title }) => ({
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

export default CommencerSideMenu
