import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'

export const CreateBaseButton = ({ className }: { className?: string }) => (
  <Link
    className={classNames(
      'fr-btn fr-btn--icon-left fr-icon-add-line',
      className,
    )}
    href="/bases/creer"
  >
    Créer une base
  </Link>
)
