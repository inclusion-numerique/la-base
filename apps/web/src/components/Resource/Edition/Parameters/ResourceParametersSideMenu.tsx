import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const resourceSections = (isPublic: boolean | null) => [
  { id: 'publication', title: 'Ressource publié dans' },
  ...(isPublic === false
    ? [{ id: 'partage', title: 'Partager votre ressource via un lien' }]
    : []),
  { id: 'visibilite', title: 'Visibilité de la ressource' },
  { id: 'indexation', title: 'Indexation' },
  { id: 'contributeurs', title: 'Contributeurs' },
  { id: 'avis', title: 'Avis sur la ressource' },
  { id: 'supprimer', title: 'Supprimer la ressource' },
]

const ResourceParametersSideMenu = ({
  isPublic,
}: {
  isPublic: boolean | null
}) => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={resourceSections(isPublic).map(({ id, title }) => ({
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
