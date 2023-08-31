import React from 'react'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'

const ProfileSideMenu = () => (
  <div className="fr-my-15w">
    <SideMenu
      burgerMenuButtonText="Contenus"
      items={[
        {
          text: 'Informations personnelles',
          linkProps: {
            href: '#informations',
          },
        },
        {
          text: 'Contacts',
          linkProps: {
            href: '#contacts',
          },
        },
        {
          text: 'Visibilité du profil',
          linkProps: {
            href: '#visibilite',
          },
        },
        {
          text: 'Mot de passe',
          linkProps: {
            href: '#mot-de-passe',
          },
        },
        {
          text: 'Supprimer le profil',
          linkProps: {
            href: '#supprimer',
          },
        },
      ]}
    />
  </div>
)

export default ProfileSideMenu
