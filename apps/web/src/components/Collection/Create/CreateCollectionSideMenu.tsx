import React from 'react'
import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const collectionSections = [
  { id: 'informations', title: 'Informations' },
  { id: 'apercu', title: 'Aperçu de la collection' },
  { id: 'visibilite', title: 'Visibilité de la collection' },
]

const CreateCollectionSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-mt-12w">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={collectionSections.map(({ id, title }) => ({
          text: title,
          linkProps: { href: `#${id}` },
        }))}
        burgerMenuButtonText="Contenus"
        contentId="create-collection-content"
        sticky
      />
    </div>
  </div>
)

export default CreateCollectionSideMenu
