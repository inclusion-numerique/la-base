import React from 'react'
import Link from 'next/link'
import EmptyBox from '../EmptyBox'
import { CreateCollectionButton } from '../Collection/CreateCollectionButton'

const EmptyCollections = ({ isMember }: { isMember: boolean }) => (
  <EmptyBox
    title={
      isMember
        ? "Vous n'avez pas de collections dans votre base."
        : 'Aucune collection dans cette base'
    }
  >
    {isMember ? (
      <>
        <div>
          Créez une collection pour organiser et partager facilement des
          ressources.{' '}
          <Link href="/" className="fr-link wip">
            En savoir plus
          </Link>
        </div>
        <div data-testid="create-collection-button">
          <CreateCollectionButton className="fr-mt-4w" />
        </div>
      </>
    ) : (
      "Revenez plus tard ou suivez cette base afin d'être tenu informé de ses prochaines publications."
    )}
  </EmptyBox>
)

export default EmptyCollections
