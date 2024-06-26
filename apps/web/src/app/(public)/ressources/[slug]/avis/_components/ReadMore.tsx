'use client'

import { useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { CropText } from '@app/web/components/CropText/CropText'

export const ReadMore = ({
  limit,
  children,
}: {
  limit: number
  children: string
}) => {
  const [readMore, setReadMore] = useState(false)

  if (children.length <= limit) return children

  return readMore ? (
    <>
      {children}
      <Button
        type="button"
        className="fr-display-block fr-mt-2w"
        priority="tertiary no outline"
        onClick={() => setReadMore(false)}
      >
        Voir moins
      </Button>
    </>
  ) : (
    <>
      <CropText limit={limit}>children</CropText>
      <Button
        type="button"
        className="fr-display-block fr-mt-1w"
        priority="tertiary no outline"
        onClick={() => setReadMore(true)}
      >
        Lire la suite
      </Button>
    </>
  )
}
