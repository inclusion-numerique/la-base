import React from 'react'
import Link from 'next/link'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { CropText } from '@app/web/components/CropText/CropText'
import BaseImage from '@app/web/components/BaseImage'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import type { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import type { SessionUser } from '@app/web/auth/sessionUser'

export type FeaturedResourceProps = {
  resource: ResourceListItem
  user: SessionUser | null
}

const BaseMetadata = ({
  base,
}: {
  base: NonNullable<FeaturedResourceProps['resource']['base']>
}) => (
  <>
    <BaseImage base={base} />
    <span className="fr-text--xs fr-mb-0">
      Publiée&nbsp;dans&nbsp;la&nbsp;base{' '}
      <Link
        href={`bases/${base.slug}`}
        className="fr-link fr-position-relative fr-link--xs"
        style={{ zIndex: 2 }}
      >
        {base.title}
      </Link>
    </span>
  </>
)

const ProfileMetadata = ({
  profile,
}: {
  profile: NonNullable<FeaturedResourceProps['resource']['createdBy']>
}) => (
  <>
    <RoundProfileImage user={profile} />
    <span className="fr-text--xs fr-mb-0">
      Publiée&nbsp;par{' '}
      {profile.isPublic ? (
        <Link
          href={`profils/${profile.slug}`}
          className="fr-link fr-position-relative  fr-link--xs"
          style={{ zIndex: 2 }}
        >
          {profile.name}
        </Link>
      ) : (
        profile.name
      )}
    </span>
  </>
)

export const FeaturedResource = ({
  resource: { title, slug, published, base, createdBy },
  // Todo use the user prop for action buttons
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  user,
}: FeaturedResourceProps) => (
  <div className="fr-border-top fr-enlarge-link fr-no-hover-bg">
    <div className="fr-my-2w fr-flex fr-align-items-center fr-flex-gap-2v">
      {base != null && <BaseMetadata base={base} />}
      {base == null && createdBy != null && (
        <ProfileMetadata profile={createdBy} />
      )}
    </div>
    <h3 className="fr-text--md fr-mb-1v">
      <Link href={`/ressources/${slug}`}>
        <CropText limit={79}>{title}</CropText>
      </Link>
    </h3>
    {!!published && (
      <span className="fr-text--xs fr-mb-0">
        Publiée&nbsp;le&nbsp;{dateAsDay(new Date(published))}
      </span>
    )}
  </div>
)
