import { ResourcePublishedState } from '@app/web/components/Resource/enums/ResourcePublishedState'
import { Spinner } from '@app/web/ui/Spinner'
import classNames from 'classnames'
import { type PropsWithChildren } from 'react'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import styles from './ResourceEditionStateBadge.module.css'

const ResourceEditionStateWrapper = ({ children }: PropsWithChildren) => (
  <p
    className={classNames('fr-text--sm', 'fr-mb-0', styles.badge)}
    data-testid="resource-edition-state"
  >
    {children}
  </p>
)

const ResourceEditionStateBadge = ({
  publishedState,
  editionState,
  unPublishedEdits,
}: {
  publishedState: ResourcePublishedState
  editionState: ResourceEditionState
  unPublishedEdits: boolean
}) => {
  // Do not display state while editing
  if (editionState === ResourceEditionState.EDITING) {
    return null
  }

  // Do not display state in action bar if no changes have been made
  if (editionState === ResourceEditionState.SAVED && !unPublishedEdits) {
    return null
  }

  if (editionState === ResourceEditionState.SAVING) {
    return (
      <ResourceEditionStateWrapper>
        <Spinner size="small" />
        <span className="fr-ml-1w">Enregistrement&hellip;</span>
      </ResourceEditionStateWrapper>
    )
  }

  // Saved and unpublished edits
  const label =
    publishedState === ResourcePublishedState.DRAFT
      ? 'Enregistrée'
      : 'Enregistrée · Modifications non publiées'

  return (
    <ResourceEditionStateWrapper>
      <span className="fr-icon--sm fr-mb-0 fr-icon-check-line" />
      <span className="fr-ml-1w">{label}</span>
    </ResourceEditionStateWrapper>
  )
}

export default ResourceEditionStateBadge
