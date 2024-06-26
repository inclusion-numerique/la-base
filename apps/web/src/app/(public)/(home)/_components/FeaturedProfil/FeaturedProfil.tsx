import React from 'react'
import Link from 'next/link'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import { countProfileResources } from '@app/web/server/profiles/countProfileResources'

export const FeaturedProfil = ({
  profile,
  // TODO use the user prop for action buttons
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  user,
}: {
  profile: ProfileListItem
  user: SessionUser | null
}) => {
  const {
    slug,
    name,
    firstName,
    lastName,
    image = null,
    _count: { followedBy },
  } = profile
  return (
    <div className="fr-flex fr-align-items-center fr-flex-gap-4v fr-enlarge-link fr-no-hover-bg">
      <RoundProfileImage user={{ firstName, lastName, image }} size={48} />
      <div>
        <h3 className="fr-text--md fr-mb-0">
          <Link href={`/profils/${slug}`}>{name}</Link>
        </h3>
        <div className="fr-text--sm fr-mb-0 fr-text-mention--grey fr-flex fr-flex-gap-2v">
          <span className="ri-file-text-line" />
          <span className="fr-flex fr-flex-gap-2v">
            <b>{countProfileResources(profile)}</b>
            <span className="fr-hidden fr-unhidden-md"> Ressources</span>
          </span>
          ·
          <span className="ri-user-heart-line" />
          <span className="fr-flex fr-flex-gap-2v">
            <b>{followedBy}</b>
            <span className="fr-hidden fr-unhidden-md"> Suivis</span>
          </span>
        </div>
      </div>
    </div>
  )
}
