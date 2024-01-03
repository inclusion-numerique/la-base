import React from 'react'
import { CreateResourceButton } from '../Resource/CreateResourceModal'
import EmptyBox from '../EmptyBox'

const EmptyProfileResources = ({
  isConnectedUser,
}: {
  isConnectedUser: boolean
}) => (
  <EmptyBox
    title={
      isConnectedUser
        ? 'Vous n’avez pas encore créé de ressources.'
        : `Aucune ressource n'est actuellement publiée sur ce profil`
    }
  >
    {isConnectedUser ? (
      <>
        <div>
          Présentez, valorisez & publiez vos ressources afin qu’elles soient
          diffusées <br />
          auprès d’un large public.
        </div>
        <div data-testid="create-resource-button">
          <CreateResourceButton className="fr-mt-4w" />
        </div>
      </>
    ) : (
      'Revenez plus tard ou suivez ce profil afin d’être tenu informé de ses prochaines publications.'
    )}
  </EmptyBox>
)

export default EmptyProfileResources
