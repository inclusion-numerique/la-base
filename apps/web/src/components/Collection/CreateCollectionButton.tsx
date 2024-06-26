import React from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import { createCollectionUrl } from '@app/web/collections/createCollectionUrl'

export const CreateCollectionButton = ({
  className,
  baseId,
}: {
  className?: string
  baseId?: string
}) => (
  <Button
    data-testid="create-collection-button"
    linkProps={{
      href: createCollectionUrl({ baseId }),
    }}
    className={classNames(className)}
  >
    <span className="ri-folder-add-line fr-mr-1w" />
    Créer une collection
  </Button>
)
