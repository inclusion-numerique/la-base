import type { SessionUser } from '@app/web/auth/sessionUser'
import BaseImage from '@app/web/components/BaseImage'
import { CropText } from '@app/web/components/CropText/CropText'
import ResourceDates from '@app/web/components/Resource/ResourceDates'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import type { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import Link from 'next/link'

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
  resource: {
    title,
    slug,
    published,
    lastPublished,
    created,
    updated,
    base,
    createdBy,
  },
  user,
}: FeaturedResourceProps) => (
  <div className="fr-border-top fr-enlarge-link fr-no-hover-bg fr-flex fr-direction-column">
    <h4 className="fr-text--md fr-mb-1v" style={{ order: 2 }}>
      <Link href={`/ressources/${slug}`}>
        <span aria-hidden="true">
          <CropText limit={79}>{title}</CropText>
        </span>
        <span className="fr-sr-only">{title}</span>
      </Link>
    </h4>
    <div
      className="fr-my-2w fr-flex fr-align-items-center fr-flex-gap-2v"
      style={{ order: 1 }}
    >
      {base != null && <BaseMetadata base={base} />}
      {base == null && createdBy != null && (
        <ProfileMetadata profile={createdBy} />
      )}
    </div>
    {!!published && (
      <div style={{ order: 3 }}>
        <ResourceDates
          canEdit={false}
          resource={{ published, lastPublished, created, updated }}
          onlyUpdatedDate={false}
        />
      </div>
    )}
  </div>
)
