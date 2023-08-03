import React from 'react'
import CustomTag, { TagColor } from '../../CustomTag'

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
}

const ResourcePublicStateBadge = ({
  isPublic,
}: {
  isPublic: boolean | null
}) => <CustomTag {...(isPublic ? informations.public : informations.private)} />

export default ResourcePublicStateBadge
