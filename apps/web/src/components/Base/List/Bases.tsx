import React from 'react'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import BaseCard from '@app/web/components/Base/Card/BaseCard'
import { CreateBaseButton } from '../CreateBaseButton'

const Bases = ({
  user,
  bases,
  canWrite,
}: {
  user: SessionUser | null
  bases: BaseListItem[]
  canWrite: boolean
}) => (
  <div data-testid="base-resources">
    <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-reverse fr-mb-4w">
      <div className="fr-col-sm-auto fr-col-12">
        <h2 className="fr-mb-0 fr-h3">Bases · {bases.length}</h2>
      </div>
      {canWrite && (
        <div className="fr-col-sm-auto fr-col-12 fr-mb-5w fr-mb-md-2w">
          <CreateBaseButton className="fr-btn--secondary fr-width-full fr-justify-content-center" />
        </div>
      )}
    </div>
    {bases.map((base) => (
      <BaseCard user={user} base={base} key={base.slug} titleAs="h3" />
    ))}
  </div>
)

export default Bases
