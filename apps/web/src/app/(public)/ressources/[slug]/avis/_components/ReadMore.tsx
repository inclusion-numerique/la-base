'use client'

import { CropText } from '@app/web/components/CropText/CropText'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRef, useState } from 'react'

export const ReadMore = ({
  limit,
  children,
}: {
  limit: number
  children: string
}) => {
  const [readMore, setReadMore] = useState(false)
  const contentRef = useRef<HTMLSpanElement>(null)

  if (children.length <= limit) return children

  return readMore ? (
    <>
      <span ref={contentRef} tabIndex={-1}>
        {children}
      </span>
      <Button
        type="button"
        className="fr-display-block fr-mt-2w"
        priority="tertiary no outline"
        aria-expanded={readMore}
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
        aria-expanded={readMore}
        onClick={() => {
          setReadMore(true)
          setTimeout(() => contentRef.current?.focus(), 0)
        }}
      >
        Lire la suite
      </Button>
    </>
  )
}
