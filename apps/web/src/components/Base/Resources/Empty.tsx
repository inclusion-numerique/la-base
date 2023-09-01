import React from 'react'
import Link from 'next/link'
import { CreateResourceButton } from '../../Resource/CreateResourceModal'
import styles from './Empty.module.css'

const Empty = ({ isMember }: { isMember: boolean }) => (
  <div className={styles.container} data-testid="base-ressources-empty-state">
    <h6 className="fr-mb-1w">
      {isMember
        ? "Vous n'avez pas de ressources dans votre base."
        : 'Aucune ressources sont actuellement publiées sur cette base'}
    </h6>
    {isMember ? (
      <>
        <div>
          Présentez, valorisez & publiez vos ressources afin qu’elles soient
          diffusées <br />
          auprès d’un large public.{' '}
          <Link href="/" className="fr-link">
            En savoir plus
          </Link>
        </div>
        <CreateResourceButton className="fr-mt-4w" />
      </>
    ) : (
      'Revenez plus tard ou ajoutez cette base à vos favoris afin de suivre leurs prochaines publications.'
    )}
  </div>
)

export default Empty
