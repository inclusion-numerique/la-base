'use client'
import Button from '@codegouvfr/react-dsfr/Button'

const InviteBaseMemberRemoveButton = ({
  onDelete,
}: {
  onDelete: () => void
}) => {
  return (
    <Button
      priority="tertiary no outline"
      title="Retirer l'invitation du membre à la base"
      data-testid="remove-member-button"
      size="small"
      type="button"
      onClick={onDelete}
    >
      Retirer
      <span className="ri-close-circle-line fr-ml-1w" aria-hidden="true" />
    </Button>
  )
}

export default InviteBaseMemberRemoveButton
