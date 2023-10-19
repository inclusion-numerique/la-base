import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'

export const CreateCollectionButton = ({
  className,
}: {
  className?: string
}) => (
  <Link
    data-testid="create-collection-button"
    className={classNames(
      'fr-btn fr-btn--icon-left fr-icon-git-repository-commits-line',
      className,
    )}
    href="/collections/creer"
  >
    Créer une collection
  </Link>
)
