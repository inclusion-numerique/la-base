import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import TextView from './TextView'

export default {
  title: 'Ressource/Content/Text/View',
  component: TextView,
} as Meta<typeof TextView>

type Story = StoryObj<typeof TextView>

const Template = (props: ComponentProps<typeof TextView>) => (
  <ResourceWrapper>
    <TextView {...props} />
  </ResourceWrapper>
)

const render = (props: ComponentProps<typeof TextView>) => (
  <Template {...props} />
)

export const Desktop: Story = {
  render,
  args: {
    content: {
      text: "<h2>Exemple de sous titre</h2><h3>Exemple de petit titre</h3><p>L’Incubateur des Territoires oeuvre en faveur de l’open source, c’est à dire un <strong>positionnement philosophique et politique</strong> pour garantir les quatre libertés de l’utilisateur : </p><ul><li><p>la liberté d'exécuter le programme, pour tous les usages&nbsp;;</p></li><li><p>la liberté d'étudier le fonctionnement du programme et de l'adapter à ses besoins&nbsp;;</p></li><li><p>la liberté de redistribuer des copies du programme (ce qui implique la possibilité aussi bien de donner que de vendre des copies)&nbsp;;</p></li><li><p>la liberté d'améliorer le programme et de distribuer ces améliorations au public, pour en faire profiter toute la communauté.</p></li></ul><p>Il part du principe qu’un logiciel financé par le contribuable doit être ouvert et mis à disposition de la collectivité. Il s’inscrit dans cette mesure dans le cadre de la <a href='\\\"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000033202746\\\"'>Loi pour une République Numérique</a> (2016) ainsi que dans l’esprit de la campagne de la <a href='\\\"https://fsfe.org/\\\"'>Free Software Foundation Europe</a> “<a href='\\\"https://publiccode.eu/\\\"'>Argent Public Code Public</a>”. Il s’agit donc d’avoir un code source ouvert et accessible en ligne, encadré par une licence libre et dont la notice d’installation, d’administration et d’utilisation soit correctement documentée afin de faciliter sa réutilisation.</p><p>L’ouverture du code source d’un logiciel offre plusieurs avantages:</p><ul><li><p>une capacité à être&nbsp;<strong>autonome</strong>&nbsp;sur la solution ;</p></li><li><p>des possibilités de&nbsp;<strong>personnalisation ;</strong></p></li><li><p>des&nbsp;<strong>améliorations</strong>&nbsp;apportées par la communauté ;</p></li><li><p>une&nbsp;<strong>mutualisation</strong>&nbsp;de la maintenance ;</p></li><li><p>une absence de&nbsp;<strong>coût</strong>&nbsp;de licence ;</p></li><li><p>une <strong>transparence</strong> de fonctionnement, des échanges et de la sécurité ;</p></li><li><p>un intérêt&nbsp;<strong>pédagogique</strong>&nbsp;grâce à la liberté d'étudier la mécanique interne du logiciel ;</p></li><li><p>la consolidation de&nbsp;<strong>biens communs</strong>&nbsp;qui permettent de favoriser l'innovation.</p></li></ul><p>L’open source incite donc à un respect des valeurs fondamentales autour du&nbsp;<strong>partage</strong>, de la&nbsp;<strong>coopération</strong> et de l'<strong>entraide</strong>. Un projet dont les sources sont ouvertes permet à un autre acteur de réutiliser un outil existant et de ne pas réinventer la roue. Dans le principe, un projet open source est donc fait pour être partagé.</p><p>En tant que porteur, vous avez été financés dans le cadre de l'accompagnement France Relance: vous devez donc ouvrir votre projet. L’idée est que celui-ci puisse être réutilisé par d’autres acteurs, de la manière la plus simple possible.  Une documentation est ainsi nécessaire pour permettre son déploiement et son utilisation par tout acteur intéressé, à l’image d’un meuble IKEA et de sa notice. </p><p><em>Le but de ce document est de présenter quelques pistes à suivre pour documenter le déploiement de son projet open source.</em></p>",
    },
  },
}

export const Mobile = mobileStory(Desktop)
