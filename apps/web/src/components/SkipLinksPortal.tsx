'use client'

import { defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinks from '@codegouvfr/react-dsfr/SkipLinks'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const SkipLinksPortal = ({
  links = defaultSkipLinks,
  elementId = 'skip-links',
}: {
  links?: { label: string; anchor: string }[]
  elementId?: string
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  return isMounted
    ? createPortal(
        <SkipLinks links={links} />,
        document.getElementById(elementId) ?? document.body,
      )
    : null
}
export default SkipLinksPortal
