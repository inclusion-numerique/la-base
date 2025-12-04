'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'

export const NewsFeedBasesNextStep = () => {
  const router = useRouter()
  return (
    <Button
      className="fr-width-full fr-flex fr-justify-content-center"
      onClick={() => router.push('/fil-d-actualite/onboarding/resume-mensuel')}
    >
      Suivant
    </Button>
  )
}
