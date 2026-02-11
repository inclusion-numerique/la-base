import EmptyBox from '../EmptyBox'
import { CreateResourceButton } from '../Resource/CreateResourceModal'

const EmptyProfileResources = ({
  canWrite,
  isOwner,
}: {
  canWrite: boolean
  isOwner: boolean
}) => (
  <EmptyBox
    title={
      isOwner
        ? 'Vous n’avez pas encore créé de ressources'
        : `Aucune ressource n'est actuellement publiée sur ce profil`
    }
  >
    {canWrite ? (
      <>
        <p className="fr-mb-0">
          Présentez, valorisez & publiez vos ressources afin qu’elles soient
          diffusées <br />
          auprès d’un large public.
        </p>
        <div data-testid="create-resource-button">
          <CreateResourceButton baseId={null} className="fr-mt-4w" />
        </div>
      </>
    ) : (
      <p className="fr-mb-0">
        Revenez plus tard ou suivez ce profil afin d’être tenu informé de ses
        prochaines publications.
      </p>
    )}
  </EmptyBox>
)

export default EmptyProfileResources
