'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { useCallback, useEffect, useRef, useState } from 'react'
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

  const onToggle = useCallback(() => {
    const next = !showFullDescription
    setShowFullDescription(next)
    if (next && descriptionRef.current) {
      // Use setTimeout to focus after the content is revealed
      setTimeout(() => descriptionRef.current?.focus(), 0)
    }
  }, [showFullDescription])

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
        role="region"
        aria-label="Description de la base"
        tabIndex={-1}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      {showReadMoreButton && (
        <Button
          priority="tertiary no outline"
          type="button"
          onClick={onToggle}
          aria-expanded={showFullDescription}
        >
          {showFullDescription ? 'Lire moins' : 'Lire la suite'}
        </Button>
      )}
    </div>
  )
}
