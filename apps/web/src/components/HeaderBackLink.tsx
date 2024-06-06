'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const HeaderBackLink = ({ href }: { href?: string }) => {
  const router = useRouter()

  return href == null ? (
    <button
      type="button"
      className="fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-mb-4v"
      onClick={router.back}
    >
      <span className="fr-icon-arrow-left-line fr-icon--sm fr-mr-1w" />
      Retour
    </button>
  ) : (
    <Link
      href={href}
      className="fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-mb-4v"
    >
      <span className="fr-icon-arrow-left-line fr-icon--sm fr-mr-1w" />
      Retour
    </Link>
  )
}

export default HeaderBackLink
