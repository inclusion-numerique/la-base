import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const collectionSections = [
  { id: 'informations', title: 'Informations de la collection' },
  { id: 'apercu', title: 'Aperçu de la collection' },
  { id: 'visibilite', title: 'Visibilité de la collection' },
  { id: 'supprimer', title: 'Supprimer la collection' },
]

const CollectionEditionSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-mt-12w">
    <div>
      <NavigationSideMenu
        items={collectionSections.map(({ id, title }) => ({
          text: title,
          linkProps: { href: `#${id}` },
        }))}
        burgerMenuButtonText="Contenus"
        contentId="collection-edition-content"
        sticky
      />
    </div>
  </div>
)

export default CollectionEditionSideMenu
