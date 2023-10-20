import Link from 'next/link'
import React from 'react'
import { User } from '@prisma/client'
import RoundImage, { RoundImageProps } from '@app/web/components/RoundImage'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { BasePageData } from '@app/web/server/bases/getBase'

const PublishedInInformation = ({
  user,
  base,
}: {
  user: Pick<User, 'firstName' | 'lastName' | 'name' | 'id'> & {
    image: RoundImageProps['image']
  }
  base: Pick<BasePageData, 'slug' | 'image' | 'title'> | null
}) => {
  const image = base ? base.image : user.image

  return (
    <div className="fr-grid-row fr-grid-row--middle">
      {base ? (
        <>
          <RoundImage className="fr-mr-1w" image={image} />
          <span className="fr-text--xs fr-mb-0">
            Dans la base{' '}
            <Link href={`/bases/${base.slug}`} className="fr-link fr-text--xs">
              {base.title}
            </Link>
          </span>
        </>
      ) : (
        <>
          <RoundProfileImage className="fr-mr-1w" user={user} />
          <span className="fr-text--xs fr-mb-0">
            Publié par{' '}
            <Link href={`/profils/${user.id}`} className="fr-link fr-text--xs">
              {user.name}
            </Link>
          </span>
        </>
      )}
    </div>
  )
}

export default PublishedInInformation
