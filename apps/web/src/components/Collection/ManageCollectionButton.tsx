import { managerCollectionUrl } from '@app/web/collections/manageCollectionUrl'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'

export const ManageCollectionButton = ({
  className,
  baseSlug,
}: {
  className?: string
  baseSlug?: string
}) => (
  <Button
    data-testid="manage-collection-button"
    linkProps={{
      href: managerCollectionUrl({ baseSlug }),
    }}
    className={classNames(className)}
  >
    <span className="ri-list-unordered fr-mr-1w" />
    Gérer
  </Button>
)
