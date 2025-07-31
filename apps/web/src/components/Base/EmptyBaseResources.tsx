import EmptyBox from '../EmptyBox'
import { CreateResourceButton } from '../Resource/CreateResourceModal'

const EmptyBaseResources = ({
  canCreateResource,
  baseId,
}: {
  canCreateResource: boolean
  baseId: string | null
}) => (
  <EmptyBox
    title={
      canCreateResource
        ? "Vous n'avez pas de ressources dans votre base."
        : `Aucune ressource n'est actuellement publiée sur cette base`
    }
  >
    {canCreateResource ? (
      <>
        <div>
          Présentez, valorisez & publiez vos ressources afin qu’elles soient
          diffusées <br />
          auprès d’un large public.
        </div>
        <div data-testid="create-resource-button">
          <CreateResourceButton
            className="fr-mt-4w"
            baseId={baseId}
            data-testid="create-resource-in-base-button"
          />
        </div>
      </>
    ) : (
      'Revenez plus tard ou suivez cette base afin d’être tenu informé de ses prochaines publications.'
    )}
  </EmptyBox>
)

export default EmptyBaseResources
