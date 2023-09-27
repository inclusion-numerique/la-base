import React from 'react'
import Link from 'next/link'
import { CreateResourceButton } from '../Resource/CreateResourceModal'
import EmptyBox from '../EmptyBox'

const EmptyResources = ({ isConnectedUser }: { isConnectedUser: boolean }) => (
  <EmptyBox
    title={
      isConnectedUser
        ? 'Vous n’avez pas encore créée de ressources.'
        : 'Aucunes ressources ne sont actuellement publiées sur ce profil'
    }
  >
    {isConnectedUser ? (
      <>
        <div>
          Présentez, valorisez & publiez vos ressources afin qu’elles soient
          diffusées <br />
          auprès d’un large public.{' '}
          <Link href="/" className="fr-link wip">
            En savoir plus
          </Link>
        </div>
        <div data-testid="create-resource-button">
          <CreateResourceButton className="fr-mt-4w" />
        </div>
      </>
    ) : (
      'Revenez plus tard ou ajoutez ce profil à vos favoris afin de suivre ses prochaines publications.'
    )}
  </EmptyBox>
)

export default EmptyResources
