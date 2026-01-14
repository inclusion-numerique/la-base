import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const baseSections = (canDelete: boolean, isPublic: boolean) => [
  { id: 'informations', title: 'Informations de la base' },
  { id: 'contacts', title: 'Contacts de la base' },
  ...(!isPublic
    ? [{ id: 'partage', title: 'Partager votre base via un lien' }]
    : []),
  { id: 'visibilite', title: 'Visibilité de la base' },
  { id: 'personnalisation', title: "Personnalisation page d'accueil" },
  ...(canDelete ? [{ id: 'supprimer', title: 'Supprimer la base' }] : []),
]

const BaseEditionSideMenu = ({
  canDelete,
  isPublic,
}: {
  canDelete: boolean
  isPublic: boolean
}) => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={baseSections(canDelete, isPublic).map(({ id, title }) => ({
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
