'use client'

import { useRouter } from 'next/navigation'

const CloseModalButton = () => {
  const router = useRouter()

  return (
    <button
      type="button"
      className="fr-link--close fr-link"
      onClick={router.back}
    >
      Fermer
    </button>
  )
}
export default CloseModalButton
