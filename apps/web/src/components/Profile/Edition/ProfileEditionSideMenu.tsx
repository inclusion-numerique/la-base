import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'
import React from 'react'

const profileSections = [
  { id: 'informations', title: 'Informations' },
  { id: 'contacts', title: 'Contacts' },
  { id: 'visibilite', title: 'Visibilité du profil' },
  { id: 'supprimer', title: 'Supprimer le profil' },
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
