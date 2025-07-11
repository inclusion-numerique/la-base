import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'
import React from 'react'

const baseSections = (canDelete: boolean) => [
  { id: 'informations', title: 'Informations de la base' },
  { id: 'contacts', title: 'Contacts de la base' },
  { id: 'visibilite', title: 'Visibilité de la base' },
  ...(canDelete ? [{ id: 'supprimer', title: 'Supprimer la base' }] : []),
]

const BaseEditionSideMenu = ({ canDelete }: { canDelete: boolean }) => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={baseSections(canDelete).map(({ id, title }) => ({
          text: title,
          linkProps: { href: `#${id}` },
        }))}
        burgerMenuButtonText="Contenus"
        contentId="base-edition-content"
        sticky
      />
    </div>
  </div>
)

export default BaseEditionSideMenu
