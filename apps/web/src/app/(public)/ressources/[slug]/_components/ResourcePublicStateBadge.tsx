import React from 'react'
import CustomTag, { TagColor } from '@app/web/components/CustomTag'

const informations = {
  public: {
    label: 'Ressource publique',
    icon: 'fr-icon-earth-fill',
    color: TagColor.GREEN,
  },
  private: {
    label: 'Ressource privée',
    icon: 'fr-icon-lock-line',
    color: TagColor.GREY,
  },
  draft: {
    label: 'Brouillon',
    icon: 'fr-icon-draft-line',
    color: TagColor.GREY,
  },
}

const ResourcePublicStateBadge = ({
  resource: { isPublic, published },
  small,
}: {
  resource: { isPublic: boolean | null; published: Date | null }
  small?: boolean
}) => (
  <CustomTag
    data-testid="resource-public-state-badge"
    {...(published
      ? isPublic
        ? informations.public
        : informations.private
      : informations.draft)}
    small={small}
  />
)

export default ResourcePublicStateBadge
