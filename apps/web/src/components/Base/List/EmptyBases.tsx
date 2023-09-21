import React from 'react'
import Link from 'next/link'
import EmptyBox from '@app/web/components/EmptyBox'
import { CreateBaseButton } from '../CreateBaseButton'

const EmptyBases = ({ isConnectedUser }: { isConnectedUser: boolean }) => (
  <EmptyBox
    title={
      isConnectedUser
        ? 'Actuellement, vous n’êtes pas membre d’une base.'
        : "Ce profil n'est membre d'aucune base"
    }
  >
    {isConnectedUser ? (
      <>
        Une base est une communauté d’utilisateurs qui souhaitent créer, publier
        & contribuer à des ressources dans une démarche collaborative. Vous
        pouvez créer votre propre base ou rejoindre une base existante en vous
        faisant inviter par un administrateur de cette base.
        <Link href="/" className="fr-link wip">
          En savoir plus
        </Link>
        <div className="fr-mt-4w">
          <CreateBaseButton className="fr-btn--secondary" />
          <Link
            className="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-search-line fr-ml-2w"
            href="/bases"
          >
            Explorer les bases
          </Link>
        </div>
      </>
    ) : (
      'Revenez plus tard ou ajoutez ce profil à vos favoris afin de suivre ses prochaines publications.'
    )}
  </EmptyBox>
)

export default EmptyBases
