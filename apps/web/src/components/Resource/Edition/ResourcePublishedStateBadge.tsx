import React from 'react'
import CustomTag, { TagColor } from '../../CustomTag'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'

const informations: Record<
  ResourcePublishedState,
  { label: string; icon: string; color: TagColor }
> = {
  [ResourcePublishedState.DRAFT]: {
    label: 'Brouillon',
    icon: 'fr-icon-draft-fill',
    color: TagColor.GREY,
  },
  [ResourcePublishedState.PUBLIC]: {
    label: 'Publiée - Publique',
    icon: 'fr-icon-earth-fill',
    color: TagColor.GREEN,
  },
  [ResourcePublishedState.PRIVATE]: {
    label: 'Publiée - Privée',
    icon: 'fr-icon-lock-line',
    color: TagColor.GREY,
  },
}

const ResourcePublishedStateBadge = ({
  state,
}: {
  state: ResourcePublishedState
}) => (
  <CustomTag {...informations[state]} data-testid="resource-published-state" />
)

export default ResourcePublishedStateBadge
