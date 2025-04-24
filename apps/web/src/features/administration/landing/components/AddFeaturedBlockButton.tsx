'use client'

import Button from '@codegouvfr/react-dsfr/Button'

const AddFeaturedBlockButton = ({
  disabled,
  onAdd,
}: {
  disabled: boolean
  onAdd: () => void
}) => (
  <Button
    className="fr-mr-1w"
    priority="primary"
    nativeButtonProps={{ onClick: onAdd }}
    disabled={disabled}
  >
    Ajouter
    <span className="ri-add-circle-line fr-ml-1w" aria-hidden="true" />
  </Button>
)

export default AddFeaturedBlockButton
