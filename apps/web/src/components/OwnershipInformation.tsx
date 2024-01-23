import Link from 'next/link'
import React from 'react'
import { User } from '@prisma/client'
import classNames from 'classnames'
import { RoundImageProps } from '@app/web/components/RoundImage'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { BasePageData } from '@app/web/server/bases/getBase'
import { WithMinimalImageData } from '@app/web/server/image/imageTypes'
import BaseImage from '@app/web/components/BaseImage'

const attributionWordings = {
  resource: {
    base: 'Publiée dans la base ',
    user: 'Publiée par ',
  },
  collection: {
    base: 'Collection de la base ',
    user: 'Collection de ',
  },
  none: {
    base: '',
    user: '',
  },
}

const OwnershipInformation = ({
  user,
  base,
  className,
  attributionWording,
}: {
  user: Pick<User, 'firstName' | 'lastName' | 'name' | 'slug' | 'id'> & {
    image: RoundImageProps['image']
  }
  base:
    | (Pick<BasePageData, 'slug' | 'title' | 'id'> & WithMinimalImageData)
    | null
  className?: string
  attributionWording: 'resource' | 'collection' | 'none'
}) => {
  const attribution =
    attributionWordings[attributionWording][base ? 'base' : 'user']

  return (
    <div
      className={classNames(
        'fr-flex fr-align-items-center fr-flex-gap-2v',
        className,
      )}
    >
      {base ? (
        <>
          <BaseImage className="fr-mr-1w" base={base} />
          <span className="fr-text--xs fr-mb-0">
            {attribution}
            <Link
              href={`/bases/${base.slug}`}
              className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
            >
              {base.title}
            </Link>
          </span>
        </>
      ) : (
        <>
          <RoundProfileImage className="fr-mr-1w" user={user} />
          <span className="fr-text--xs fr-mb-0">
            {attribution}
            <Link
              href={`/profils/${user.slug}`}
              className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
            >
              {user.name}
            </Link>
          </span>
        </>
      )}
    </div>
  )
}

export default OwnershipInformation
