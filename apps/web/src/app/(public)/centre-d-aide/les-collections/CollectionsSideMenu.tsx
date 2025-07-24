'use client'

import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const COLLECTIONS_SECTIONS = [
  {
    id: 'collection',
    title: 'Une collection, c’est quoi ?',
  },
  { id: 'creation-collection', title: 'Création d’une collection' },
  {
    id: 'ressources-collection',
    title: 'Enregistrer des ressources dans une collection',
  },
  { id: 'enregistrer-collection', title: 'Enregistrer une collection' },
  {
    id: 'infos-collection',
    title: 'Informations & paramètres d’une collection',
  },
]

const CollectionsSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={COLLECTIONS_SECTIONS.map(({ id, title }) => ({
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

export default CollectionsSideMenu
