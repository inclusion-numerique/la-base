import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import LinkContentView from './LinkContentView'

export default {
  title: 'Ressource/Content/Link/View',
  component: LinkContentView,
} as Meta<typeof LinkContentView>

type Story = StoryObj<typeof LinkContentView>

const Template = (props: ComponentProps<typeof LinkContentView>) => (
  <ResourceWrapper>
    <LinkContentView {...props} />
  </ResourceWrapper>
)

const render = (props: ComponentProps<typeof LinkContentView>) => (
  <Template {...props} />
)

export const AvecImageEtFavicon: Story = {
  name: 'Desktop - Avec image et favicon',
  render,
  args: {
    content: {
      title: 'Titre du lien',
      showPreview: true,
      url: 'https://www.gouvernement.fr/actualite/les-resultats-de-lindex-de-legalite-professionnelle-2023',
      caption:
        'Cras gravida dolor volutpat orci eleifend, sit amet lacinia mi egestas. Vivamus non lorem vitae justo rhoncus tincidunt. Nulla pulvinar nisi vitae odio elementum, nec sollicitudin dui dapibus.',
      linkTitle: 'Programme Société Numérique - Societé Numérique',
      linkDescription:
        "Faciliter l'accès à des formations d’initiation ou de perfectionnement aux outils et usages numériques Construire une politique locale d'inclusion",
      linkImageUrl:
        'https://www.gouvernement.fr/upload/media/content/0001/05/5818ce1507999816c8ef7cd961e48d6dc5446c51.jpeg',
      linkFaviconUrl: 'https://www.gouvernement.fr/favicon.ico',
    },
  },
}

export const AvecImageEtSansFaviconMobile = mobileStory(AvecImageEtFavicon)

export const SansImageNiFavicon: Story = {
  name: 'Desktop - Sans image',
  render,
  args: {
    content: {
      title: 'Titre du lien',
      showPreview: true,
      url: 'https://www.gouvernement.fr/actualite/les-resultats-de-lindex-de-legalite-professionnelle-2023',
      caption:
        'Cras gravida dolor volutpat orci eleifend, sit amet lacinia mi egestas. Vivamus non lorem vitae justo rhoncus tincidunt. Nulla pulvinar nisi vitae odio elementum, nec sollicitudin dui dapibus.',
      linkTitle: 'Programme Société Numérique - Societé Numérique',
      linkDescription:
        "Faciliter l'accès à des formations d'initiation ou de perfectionnement aux outils et usages numériques Construire une politique locale d'inclusion",
      linkImageUrl: null,
      linkFaviconUrl: null,
    },
  },
}

export const SansImageNiFaviconMobile = mobileStory(SansImageNiFavicon)
