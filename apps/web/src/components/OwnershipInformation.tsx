import BaseImage from '@app/web/components/BaseImage'
import type { RoundImageProps } from '@app/web/components/RoundImage'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import type { BasePageData } from '@app/web/server/bases/getBase'
import type { WithMinimalImageData } from '@app/web/server/image/imageTypes'
import type { User } from '@prisma/client'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { formatName } from '../server/rpc/user/formatName'

const attributionWordings = {
  resource: {
    what: 'Publiée',
    where: ' dans la base ',
    by: ' par ',
  },
  'draft-resource': {
    what: 'Créée',
    where: ' dans la base ',
    by: ' par ',
  },
  collection: {
    what: 'Collection',
    where: ' de la base ',
    by: ' par ',
  },
  none: {
    what: '',
    where: '',
    by: '',
  },
}

const OwnershipInformation = ({
  user,
  base,
  className,
  attributionWording,
  displayUser = true,
}: {
  user: Pick<
    User,
    'firstName' | 'lastName' | 'name' | 'slug' | 'id' | 'isPublic'
  > & {
    image: RoundImageProps['image']
  }
  base:
    | (Pick<BasePageData, 'slug' | 'title' | 'id'> & WithMinimalImageData)
    | null
  className?: string
  attributionWording: 'resource' | 'draft-resource' | 'collection' | 'none'
  displayUser?: boolean
}) => (
  <div
    className={classNames(
      'fr-flex fr-align-items-center fr-flex-gap-2v',
      className,
    )}
  >
    {base ? <BaseImage base={base} /> : <RoundProfileImage user={user} />}
    <span className="fr-text--xs fr-mb-0">
      {attributionWordings[attributionWording].what}
      {base != null && (
        <>
          {attributionWordings[attributionWording].where}
          <Link
            href={`/bases/${base.slug}`}
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
          >
            {base.title}
          </Link>
          &nbsp;par{' '}
          <Link
            href={`/profils/${user.slug}`}
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
          >
            {user.name && formatName(user.name)}
          </Link>
        </>
      )}
      {(!base ||
        (user.isPublic && displayUser && attributionWording !== 'none')) && (
        <>
          {attributionWordings[attributionWording].by}
          <Link
            href={`/profils/${user.slug}`}
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
          >
            {user.name && formatName(user.name)}
          </Link>
        </>
      )}
    </span>
  </div>
)

export default OwnershipInformation
