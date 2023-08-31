import React from 'react'
import Link from 'next/link'
import { CreateResourceButton } from '../Resource/CreateResourceModal'
import EmptyBox from '../EmptyBox'

const EmptyResources = ({ isConnectedUser }: { isConnectedUser: boolean }) => (
  <EmptyBox
    title={
      isConnectedUser
        ? 'Vous n’avez pas encore créée de ressources.'
        : 'Aucune ressources sont actuellement publiées sur ce profil'
    }
  >
    {isConnectedUser ? (
      <>
        <div>
          Présentez, valorisez & publiez vos ressources afin qu’elles soient
          diffusées <br />
          auprès d’un large public.{' '}
          <Link href="/" className="fr-link">
            En savoir plus --TODO--
          </Link>
        </div>
        <CreateResourceButton className="fr-mt-4w" />
      </>
    ) : (
      'Revenez plus tard ou ajoutez ce profil à vos favoris afin de suivre ses prochaines publications.'
    )}
  </EmptyBox>
)

export default EmptyResources
