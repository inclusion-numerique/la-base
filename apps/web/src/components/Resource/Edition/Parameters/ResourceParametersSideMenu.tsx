import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'
import React from 'react'

const resourceSections = [
  { id: 'publication', title: 'Ressource publié dans' },
  { id: 'visibilite', title: 'Visibilité de la ressource' },
  { id: 'indexation', title: 'Indexation' },
  { id: 'contributeurs', title: 'Contributeurs' },
  { id: 'avis', title: 'Avis sur la ressource' },
  { id: 'supprimer', title: 'Supprimer la ressource' },
]

const ResourceParametersSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={resourceSections.map(({ id, title }) => ({
          text: title,
          linkProps: { href: `#${id}` },
        }))}
        burgerMenuButtonText="Contenus"
        contentId="resource-parameters"
        sticky
      />
    </div>
  </div>
)

export default ResourceParametersSideMenu
