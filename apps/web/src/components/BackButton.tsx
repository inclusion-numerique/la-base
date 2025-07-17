'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { type ReactNode } from 'react'

const BackButton = ({
  children = 'Retour',
  className,
}: {
  children?: ReactNode
  className?: string
}) => {
  const router = useRouter()
  return (
    <Button
      priority="tertiary no outline"
      size="small"
      className={classNames('fr-mt-4v fr-mb-4v fr-pl-0', className)}
      onClick={() => router.back()}
    >
      <div>
        <span className="fr-icon-arrow-left-line fr-icon--sm fr-mr-2v" />
        <span className="fr-text--md">{children}</span>
      </div>
    </Button>
  )
}

export default BackButton
