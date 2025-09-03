'use client'

import { CollectionsResourceModal } from '@app/web/app/(public)/ressources/[slug]/_components/ResourceCollectionsModal'
import classNames from 'classnames'
import Link from 'next/link'

const ResourceInformationsModalButton = ({
  title = 'Voir les collections',
  className,
}: {
  title?: string
  className?: string
}) => (
  <Link
    href="#"
    title={title}
    className={classNames(
      'fr-link--underline-on-hover fr-text--sm fr-mb-0',
      className,
    )}
    onClick={(e) => {
      e.preventDefault()
      CollectionsResourceModal.open()
    }}
    role="button"
  >
    {title}
  </Link>
)

export default ResourceInformationsModalButton
