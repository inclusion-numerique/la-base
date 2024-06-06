'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import React from 'react'
import { feedbackModalId } from './Feedback/feedbackModalProps'

export const HelpMenu = () => (
  <ul>
    <li>
      <Link className="fr-btn" href="/centre-d-aide">
        <span
          className="ri-question-line fr-mr-1w fr-text-label--blue-france"
          aria-hidden
        />
        Centre d’aide
      </Link>
    </li>
    <li data-testid="header-feedback-control-button">
      <Button
        key="feedback"
        type="button"
        aria-controls={feedbackModalId}
        data-fr-opened={false}
      >
        <span
          className="ri-feedback-line fr-mr-1w fr-text-label--blue-france"
          aria-hidden
        />
        Je donne mon avis
      </Button>
    </li>
  </ul>
)
