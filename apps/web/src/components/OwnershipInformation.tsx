import BaseImage from '@app/web/components/BaseImage'
import type { RoundImageProps } from '@app/web/components/RoundImage'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import type { BasePageData } from '@app/web/server/bases/getBase'
import type { WithMinimalImageData } from '@app/web/server/image/imageTypes'
import type { User } from '@prisma/client'
import classNames from 'classnames'
import { formatName } from '../server/rpc/user/formatName'
import styles from './OwnershipInformation.module.css'

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

// There is issue with the Link component from nextjs@15, with the scroll restoration not jumping on top while redirecting.
// For now I fallback to a simple <a> tag.
// ref. https://github.com/vercel/next.js/issues/64441
// ref. https://github.com/vercel/next.js/issues/79571
// ref. https://github.com/vercel/next.js/issues/80615
const OwnershipInformation = ({
  user,
  base,
  className,
  attributionWording,
  withImage = true,
  children,
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
  withImage?: boolean
  children?: React.ReactNode
}) => (
  <div
    className={classNames(
      'fr-flex fr-align-items-center fr-flex-gap-2v',
      className,
    )}
  >
    {withImage &&
      (base ? <BaseImage base={base} /> : <RoundProfileImage user={user} />)}
    <span className={classNames('fr-text--xs fr-mb-0', styles.title)}>
      {attributionWordings[attributionWording].what}
      {base != null && (
        <>
          {attributionWordings[attributionWording].where}
          <a
            href={`/bases/${base.slug}`}
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
          >
            {base.title}
          </a>
          {attributionWordings[attributionWording].by}
          <a
            href={`/profils/${user.slug}`}
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
          >
            {user.name && formatName(user.name)}
          </a>
        </>
      )}
      {!base && user.isPublic && attributionWording !== 'none' && (
        <>
          {attributionWordings[attributionWording].by}
          <a
            href={`/profils/${user.slug}`}
            className="fr-link fr-text--xs fr-text-decoration--none fr-link--underline-on-hover"
          >
            {user.name && formatName(user.name)}
          </a>
        </>
      )}
    </span>
    {children}
  </div>
)

export default OwnershipInformation
