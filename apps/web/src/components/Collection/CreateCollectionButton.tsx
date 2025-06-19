import { createCollectionUrl } from '@app/web/collections/createCollectionUrl'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React from 'react'

export const CreateCollectionButton = ({
  className,
  baseId,
  title = 'Créer une collection',
}: {
  className?: string
  baseId?: string
  title?: string
}) => (
  <Button
    data-testid="create-collection-button"
    linkProps={{
      href: createCollectionUrl({ baseId }),
    }}
    className={classNames(className)}
  >
    <span className="ri-folder-add-line fr-mr-1w" />
    {title}
  </Button>
)
