import React from 'react'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'

const BaseSideMenu = ({ isAdmin }: { isAdmin: boolean }) => {
  const items = [
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
  ]
  if (isAdmin) {
    items.push({
      text: 'Supprimer la base',
      linkProps: {
        href: '#supprimer',
      },
    })
  }

  return (
    <div className="fr-hidden fr-unhidden-lg">
      <div>
        <SideMenu burgerMenuButtonText="Contenus" sticky items={items} />
      </div>
    </div>
  )
}

export default BaseSideMenu
