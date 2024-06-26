import type { Category } from '@app/web/themes/themes'

export type CategoryStyle = {
  description: string
  icon: string
  color: string
  background: string
  tagsClassName: string
}

export const categoryStyles: { [key in Category]: CategoryStyle } = {
  'Inclusion & compétences numériques': {
    description:
      'Processus visant à rendre le numérique accessible à chaque individu pour une plus grande autonomie dans un monde de plus en plus digital. Les compétences numériques transmises peuvent ainsi devenir un levier d’inclusion sociale et économique.',
    icon: 'ri-service-fill',
    color: 'fr-text-label--green-archipel',
    background: 'fr-background-alt--green-archipel',
    tagsClassName: 'fr-tag--green-archipel',
  },
  'Numérique & environnement': {
    description:
      'Penser des infrastructures et services numériques plus frugaux et adaptés à un monde en proie à la crise écologique via la sobriété énergétique, l’écoconception, le reconditionnement, le questionnement des pratiques.',
    icon: 'ri-leaf-fill',
    color: 'fr-text-label--green-bourgeon',
    background: 'fr-background-alt--green-bourgeon',
    tagsClassName: 'fr-tag--green-bourgeon',
  },
  'Culture numérique': {
    description:
      'Ensemble des connaissances, compétences, pratiques et valeurs issues de la diffusion des technologies numériques, d’Internet et du web.',
    icon: 'ri-stack-fill',
    color: 'fr-text-label--pink-tuile',
    background: 'fr-background-alt--pink-tuile',
    tagsClassName: 'fr-tag--pink-tuile',
  },
  'Communs & souveraineté': {
    description:
      'Réflexions et solutions pour construire des  services qui repensent la logique propriétaire, promeuvent la mise en commun de ressources, leur gouvernance partagée et la logique de communauté pour répondre collectivement à la prise en charge de problèmes sociétaux, dans un autre rapport à l’institution.',
    icon: 'ri-government-fill',
    color: 'fr-text-label--yellow-tournesol',
    background: 'fr-background-alt--yellow-tournesol',
    tagsClassName: 'fr-tag--yellow-tournesol',
  },
}
