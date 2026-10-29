import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const profileSections = [
  { id: 'informations', title: 'Informations sur votre profil' },
  { id: 'contacts', title: 'Vos contacts' },
  { id: 'visibilite', title: 'Visibilité de votre profil' },
  { id: 'notifications', title: 'Notifications' },
  { id: 'supprimer', title: 'Supprimer votre profil' },
]

const ProfileEditionSideMenu = ({
  withNotifications,
}: {
  withNotifications: boolean
}) => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={profileSections
          .filter(({ id }) => withNotifications || id !== 'notifications')
          .map(({ id, title }) => ({
            text: title,
            linkProps: { href: `#${id}` },
          }))}
        burgerMenuButtonText="Contenus"
        contentId="profile-edition-content"
        sticky
        aria-label="Zones de contenu de la page"
      />
    </div>
  </div>
)

export default ProfileEditionSideMenu
