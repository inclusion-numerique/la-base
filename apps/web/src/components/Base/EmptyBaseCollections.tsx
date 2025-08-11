import { ExploreResourceButton } from '@app/web/components/Resource/ExploreResourceButton'
import Link from 'next/link'
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
            href="https://docs.numerique.gouv.fr/docs/5f8d928b-2fd7-4f4a-b8fd-ca9c841dc841/"
            target="_blank"
            rel="noopener noreferrer"
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
