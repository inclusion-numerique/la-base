import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const profileSections = [
  { id: 'informations', title: 'Informations sur votre profil' },
  { id: 'contacts', title: 'Vos contacts' },
  { id: 'visibilite', title: 'Visibilité de votre profil' },
  { id: 'supprimer', title: 'Supprimer votre profil' },
]

const ProfileEditionSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={profileSections.map(({ id, title }) => ({
          text: title,
          linkProps: { href: `#${id}` },
        }))}
        burgerMenuButtonText="Contenus"
        contentId="profile-edition-content"
        sticky
      />
    </div>
  </div>
)

export default ProfileEditionSideMenu
