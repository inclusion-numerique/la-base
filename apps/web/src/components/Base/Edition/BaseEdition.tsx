import BaseDeletion from '@app/web/components/Base/Edition/BaseDeletion'
import BaseEditionContacts from '@app/web/components/Base/Edition/BaseEditionContacts'
import BaseEditionInformation from '@app/web/components/Base/Edition/BaseEditionInformation'
import BaseEditionShareableLink from '@app/web/components/Base/Edition/BaseEditionShareableLink'
import BaseEditionSideMenu from '@app/web/components/Base/Edition/BaseEditionSideMenu'
import BaseHomePageCustomisation from '@app/web/components/Base/Edition/BaseHomePageCustomisation'
import BaseVisibilityForm from '@app/web/components/Base/Edition/BaseVisibilityForm'
import Card from '@app/web/components/Card'
import type { BasePageData } from '@app/web/server/bases/getBase'
import classNames from 'classnames'
import styles from './BaseEdition.module.css'

const BaseEdition = ({
  base,
  canDelete,
}: {
  base: BasePageData
  canDelete: boolean
}) => (
  <div className="fr-container fr-flex-md">
    <BaseEditionSideMenu canDelete={canDelete} isPublic={base.isPublic} />
    <div
      className={classNames(
        'fr-flex-grow-1 fr-container--slim',
        styles.container,
      )}
    >
      <BaseEditionInformation base={base} />
      <BaseEditionContacts base={base} />
      <BaseEditionShareableLink base={base} />
      <BaseHomePageCustomisation base={base} />
      <BaseVisibilityForm
        base={base}
        className={classNames(canDelete && 'fr-mt-3w', 'fr-my-3w')}
      />
      {canDelete && (
        <Card
          noBorder
          className="fr-mt-3w fr-border-radius--8 fr-border"
          id="supprimer"
          title="Supprimer la base"
          titleClassName="fr-text-label--blue-france"
          titleAs="h2"
          description={
            <div className="fr-flex fr-direction-column fr-direction-sm-row fr-justify-content-space-between fr-flex-gap-4v">
              Cette action est irréversible et entraîne la suppression
              définitive de toutes les ressources de la Base.
              <div>
                <BaseDeletion base={base} />
              </div>
            </div>
          }
        ></Card>
      )}
    </div>
  </div>
)

export default BaseEdition
