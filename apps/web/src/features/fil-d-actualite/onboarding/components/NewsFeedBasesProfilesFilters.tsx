'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { useState } from 'react'

export const NewsFeedBasesProfilesFilters = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Button
      priority="tertiary no outline"
      className="fr-width-full fr-text-mention--black fr-text--start"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span
        className={`ri-arrow-${isOpen ? 'down' : 'right'}-s-line fr-mr-1w`}
      />
      <span className="fr-text--uppercase fr-text--xs">
        Mes bases et profils suivis
      </span>
    </Button>
  )
}
