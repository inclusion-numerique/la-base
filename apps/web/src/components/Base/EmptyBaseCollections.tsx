import React from 'react'
import Link from 'next/link'
import { ExploreResourceButton } from '@app/web/components/Resource/ExploreResourceButton'
import EmptyBox from '../EmptyBox'

const EmptyBaseCollections = ({ isOwner }: { isOwner: boolean }) => (
  <EmptyBox
    title={
      isOwner
        ? "Vous n'avez pas de ressources dans votre collection."
        : "Aucune ressource n'est actuellement enregistrée dans cette collection"
    }
  >
    {isOwner && (
      <>
        <p>
          Grâce aux collections, organisez et partagez facilement des
          ressources.&nbsp;
          <Link
            href="/centre-d-aide/les-collections#ressources-collection"
            className="fr-link"
          >
            En savoir plus
          </Link>
        </p>
        <div>
          <ExploreResourceButton />
        </div>
      </>
    )}
  </EmptyBox>
)

export default EmptyBaseCollections
