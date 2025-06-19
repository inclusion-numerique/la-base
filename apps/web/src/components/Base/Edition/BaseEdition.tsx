import BaseDeletion from '@app/web/components/Base/Edition/BaseDeletion'
import BaseEditionContacts from '@app/web/components/Base/Edition/BaseEditionContacts'
import BaseEditionInformation from '@app/web/components/Base/Edition/BaseEditionInformation'
import BaseEditionSideMenu from '@app/web/components/Base/Edition/BaseEditionSideMenu'
import BaseVisibilityForm from '@app/web/components/Base/Edition/BaseVisibilityForm'
import Card from '@app/web/components/Card'
import type { BasePageData } from '@app/web/server/bases/getBase'
import React from 'react'

const BaseEdition = ({
  base,
  canDelete,
}: {
  base: BasePageData
  canDelete: boolean
}) => (
  <div className="fr-container fr-flex">
    <BaseEditionSideMenu canDelete={canDelete} />
    <div className="fr-flex-grow-1 fr-container--slim">
      <BaseEditionInformation base={base} />
      <BaseEditionContacts base={base} />
      <BaseVisibilityForm
        base={base}
        className={canDelete ? 'fr-mt-3w' : 'fr-my-3w'}
      />
      {canDelete && (
        <Card
          className="fr-my-3w"
          id="supprimer"
          title="Supprimer la base"
          titleAs="h2"
          description="Cette action est irréversible et entraîne la suppression définitive de toutes les ressources de la Base. Utilisez cette fonction avec précaution."
          contentSeparator
        >
          <BaseDeletion base={base} />
        </Card>
      )}
    </div>
  </div>
)

export default BaseEdition
