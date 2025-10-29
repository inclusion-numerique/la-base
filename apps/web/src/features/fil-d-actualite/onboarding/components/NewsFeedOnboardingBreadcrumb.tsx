'use client'

import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { usePathname } from 'next/navigation'

export default function NewsFeedOnboardingBreadcrumb() {
  const pathname = usePathname()
  const currentPage = pathname?.split('/').pop()

  const currentPageLabel = {
    'secteurs-professionnels': 'Quel secteur professionnel vous intéresse ?',
    themes: 'Quelles thématiques vous intéressent ?',
    bases: 'Suivez des bases',
    validation: 'Résumé mensuel des dernières publications',
  }
  return (
    <Breadcrumbs
      parents={[
        {
          label: "Paramétrer mon fil d'actualité",
          linkProps: { href: '/fil-d-actualite/onboarding' },
        },
      ]}
      currentPage={
        currentPageLabel[currentPage as keyof typeof currentPageLabel]
      }
      className="fr-m-0 fr-pt-4v"
    />
  )
}
