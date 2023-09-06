import React from 'react'
import Link from 'next/link'
import { CreateResourceButton } from '../Resource/CreateResourceModal'
import EmptyBox from '../EmptyBox'

const EmptyResources = ({ isMember }: { isMember: boolean }) => (
  <EmptyBox
    title={
      isMember
        ? "Vous n'avez pas de ressources dans votre base."
        : 'Aucune ressources sont actuellement publiées sur cette base'
    }
  >
    {isMember ? (
      <>
        <div>
          Présentez, valorisez & publiez vos ressources afin qu’elles soient
          diffusées <br />
          auprès d’un large public.{' '}
          <Link href="/" className="fr-link wip">
            En savoir plus
          </Link>
        </div>
        <CreateResourceButton className="fr-mt-4w" />
      </>
    ) : (
      'Revenez plus tard ou ajoutez cette base à vos favoris afin de suivre leurs prochaines publications.'
    )}
  </EmptyBox>
)

export default EmptyResources
