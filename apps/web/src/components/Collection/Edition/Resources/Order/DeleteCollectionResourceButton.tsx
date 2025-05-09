'use client'

import { withTrpc } from '@app/web/components/trpc/withTrpc'
import Button from '@codegouvfr/react-dsfr/Button'

const DeleteCollectionResourceButton = ({
  onDelete,
}: {
  onDelete: () => void
}) => (
  <Button
    className="fr-mr-1w"
    priority="tertiary no outline"
    nativeButtonProps={{ onClick: onDelete }}
  >
    Retirer
    <span className="ri-close-circle-line fr-ml-1w" aria-hidden="true" />
  </Button>
)

export default withTrpc(DeleteCollectionResourceButton)
