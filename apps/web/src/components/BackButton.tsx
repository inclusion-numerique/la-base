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
      className={classNames('fr-mt-4v fr-mb-4v', className)}
      onClick={() => router.back()}
    >
      <div className="fr-border-bottom fr-border--blue-france-high">
        <span className="fr-icon-arrow-left-line fr-icon--sm fr-mr-2v" />
        {children}
      </div>
    </Button>
  )
}

export default BackButton
