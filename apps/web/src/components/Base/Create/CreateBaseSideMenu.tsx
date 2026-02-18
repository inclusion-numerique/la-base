import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const baseSections = [
  { id: 'informations', title: 'Informations' },
  { id: 'contacts', title: 'Contacts' },
  { id: 'visibilite', title: 'Visibilité de la base' },
  { id: 'inviter', title: 'Inviter des membres' },
  { id: 'photos', title: 'Photo de profil & courverture' },
]

const CreateBaseSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={baseSections.map(({ id, title }) => ({
          text: title,
          linkProps: { href: `#${id}` },
        }))}
        burgerMenuButtonText="Contenus"
        contentId="create-base-content"
        sticky
        aria-label="Zones de contenu de la page"
      />
    </div>
  </div>
)

export default CreateBaseSideMenu
