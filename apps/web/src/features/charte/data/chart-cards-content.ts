import { ChartCardProps } from '@app/web/features/charte/components/ChartCard'

export const CHART_CARDS_CONTENT: ChartCardProps[] = [
  {
    title: 'Éduquer',
    iconId: 'ri-graduation-cap-line',
    resourceLink: {
      label:
        'Kit d’atelier de sensibilisation aux bonnes pratiques numériques à destination des adolescents et adolescentes',
      href: '/ressources/kit-atelier-connectes-engages...-et-toi-cycle-4-lycee-12-18-ans',
    },
    items: [
      'Accompagne la montée en compétences numériques des citoyens et citoyennes',
      'Permet de mieux s’approprier des dispositifs numériques existants',
      'Encourage une compréhension critique des impacts du numériques sur notre société',
    ],
  },
  {
    title: 'Ouvrir',
    iconId: 'ri-open-source-line',
    resourceLink: {
      label: 'Alternative Open Source à Itunes',
      href: '/ressources/amarok-alternative-open-source-a-i-tunes-music-mac-wind-linux',
    },
    items: [
      'Rend accessibles des données et des ressources',
      'Documente les développements d’un dispositif ou d’une initiative mis en place',
      'Promeut une culture de transparence de la donnée, des outils et des connaissances et de gouvernance partagée',
    ],
  },
  {
    title: 'Harmoniser',
    iconId: 'ri-git-fork-line',
    resourceLink: {
      label:
        'Fiche pratique donnant des pistes de collaboration entre les conseillers numériques d’un même territoire',
      href: '/ressources/fiche-comment-organiser-des-echanges-de-bonnes-pratiques-et-actions-collectives-sur-mon-territoire',
    },
    items: [
      'Complète des dispositifs numériques existants',
      'Favorise la collaboration entre celles et ceux qui agissent déjà sur les territoires',
    ],
  },
  {
    title: 'Débattre',
    iconId: 'ri-question-answer-line',
    resourceLink: {
      label: 'MOOC sur un Internet citoyen et un web décentralisé',
      href: '/ressources/mooc-internet-pourquoi-et-comment-reprendre-le-controle',
    },
    items: [
      'Encourage un dialogue démocratique autour de nos usages du numérique',
      'Crée des espaces de discussion sur l’impact du numérique sur notre société ',
    ],
  },
  {
    title: 'Faire ensemble',
    iconId: 'ri-team-line',
    resourceLink: {
      label:
        'Partage Ton Outil : outiller la transition numérique des associations !',
      href: '/ressources/partage-ton-outil-outiller-la-transition-numerique-des-associations',
    },
    items: [
      'Permet de co-construire ensemble avec le numérique',
      'Favorise la co-construction de services numériques',
    ],
  },
  {
    title: 'Améliorer',
    iconId: 'ri-sticky-note-add-line',
    resourceLink: {
      label: "Webinaire - L'évaluation et l'impact de nos actions",
      href: '/ressources/webinaire-l-evaluation-et-l-impact-de-nos-actions',
    },
    items: [
      'Est mise à jour en fonction des retours utilisateurs',
      "Propose des outils d'évaluation des impacts du numérique (environnementaux, sociaux...)",
      'Présente une méthode pour améliorer les pratiques numériques',
    ],
  },
  {
    title: 'Tempérer',
    iconId: 'ri-scales-line',
    resourceLink: {
      label: 'Kit d’activité - Sobriété numérique et numérique responsable',
      href: '/ressources/kit-d-activites-sobriete-numerique-et-numerique-responsable',
    },
    items: [
      'Promeut des pratiques de sobriété numérique et encourage des pratiques numériques plus responsables et plus durables',
      'Sensibilise aux impacts écologiques du numérique',
      'Examine les solutions numériques favorisant la transition écologique ',
    ],
  },
]

export const CHART_CARDS_CONTENT_PARTICIPATION = [
  {
    title: 'Modération participative',
    description:
      'Les utilisateurs et utilisatrices sont invités à participer activement à la modération des contenus partagés, en signalant toute ressource qui ne respecterait pas la charte de la plateforme.',
    imageUrl: '/images/charte/logo-moderation-participative.svg',
    imageAlt: 'Logo illustratif de la modération participative',
  },
  {
    title: 'Système d’évaluation',
    description:
      'La communauté est invité à recommander les ressources publiées, aussi bien sur leur forme (clarté, documents accessibles...), que sur le fond (proximité ou non avec les principes du numérique d’intérêt général).',
    imageUrl: '/images/charte/logo-systeme-evaluation.svg',
    imageAlt: 'Logo illustratif du système d’évaluation',
  },
]
