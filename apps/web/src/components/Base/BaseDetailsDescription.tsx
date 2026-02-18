'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { useEffect, useRef, useState } from 'react'
import styles from './BaseDetailsDescription.module.css'

export const BaseDetailsDescription = ({
  description,
}: {
  description: string | null
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showReadMoreButton, setShowReadMoreButton] = useState(false)
  const descriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (description && descriptionRef.current) {
      const element = descriptionRef.current
      setShowReadMoreButton(element.scrollHeight > element.clientHeight)
    }
  }, [description])

  if (!description) {
    return (
      <div>
        <p>Pas de description</p>
      </div>
    )
  }

  return (
    <div>
      <div
        ref={descriptionRef}
        className={showFullDescription ? '' : styles.truncatedDescription}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      {showReadMoreButton && (
        <Button
          priority="tertiary no outline"
          type="button"
          onClick={() => setShowFullDescription(!showFullDescription)}
          aria-expanded={showFullDescription}
          nativeButtonProps={{
            tabIndex: -1,
          }}
        >
          {showFullDescription ? 'Lire moins' : 'Lire la suite'}
        </Button>
      )}
    </div>
  )
}
