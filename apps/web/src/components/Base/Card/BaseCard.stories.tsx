import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import { generateBaseExcerpt } from '@app/web/bases/baseExcerpt'
import type { BaseProfileListItem } from '@app/web/server/bases/getBasesList'
import { testSessionUser } from '@app/web/test/testSessionUser'
import type { Meta, StoryObj } from '@storybook/react'
import BaseCard from './BaseCard'

const description =
  '<h1>HTML Ipsum Presents</h1>\n' +
  '\n' +
  '\t\t\t\t<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>\n' +
  '\n' +
  '\t\t\t\t<h2>Header Level 2</h2>\n' +
  '\n' +
  '\t\t\t\t<ol>\n' +
  '\t\t\t\t   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>\n' +
  '\t\t\t\t   <li>Aliquam tincidunt mauris eu risus.</li>\n' +
  '\t\t\t\t</ol>\n' +
  '\n' +
  '\t\t\t\t<blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>\n' +
  '\n' +
  '\t\t\t\t<h3>Header Level 3</h3>\n' +
  '\n' +
  '\t\t\t\t<ul>\n' +
  '\t\t\t\t   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>\n' +
  '\t\t\t\t   <li>Aliquam tincidunt mauris eu risus.</li>\n' +
  '\t\t\t\t</ul>\n' +
  '\n' +
  '\t\t\t\t<pre><code>\n' +
  '\t\t\t\t#header h1 a {\n' +
  '\t\t\t\t  display: block;\n' +
  '\t\t\t\t  width: 300px;\n' +
  '\t\t\t\t  height: 80px;\n' +
  '\t\t\t\t}\n' +
  '\t\t\t\t</code></pre>'

const base = {
  id: 'f41d4215-aee5-4b39-95c9-60484df15de9',
  title: 'Conseiller numérique France Services - contributions',
  slug: 'conseiller-numérique-france-services-contributions',
  isPublic: false,
  department: '08',
  excerpt: generateBaseExcerpt(description),
  image: {
    id: 'portrait',
  },
  coverImage: null,
  followedBy: [],
  _count: { resources: 8, followedBy: 4, resourcesViews: 0 },
} satisfies BaseProfileListItem

export default {
  title: 'Base/Card',
  component: BaseCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=5593-83850&t=IaARn0o9n5mR7w18-4',
    },
  },
} as Meta<typeof BaseCard>

type Story = StoryObj<typeof BaseCard>

const CompleteStory: Story = { args: { base } }

export const Complete = mediumContainerStory(CompleteStory)

export const CompleteMobile = mobileStory(CompleteStory)

const SansImageStory: Story = {
  args: {
    base: {
      ...base,
      image: null,
      department: null,
      followedBy: [{ id: testSessionUser.id }],
    },
    user: testSessionUser,
  },
}

export const SansImage = mediumContainerStory(SansImageStory)

export const SansImageMobile = mobileStory(SansImageStory)

const SansDescriptionStory: Story = {
  args: { base: { ...base, excerpt: null, isPublic: true } },
}

export const SansDescription = mediumContainerStory(SansDescriptionStory)

export const SansDescriptionMobile = mobileStory(SansDescriptionStory)

const SansInfosStory: Story = {
  args: { base: { ...base, excerpt: null, department: null } },
}

export const SansInfos = mediumContainerStory(SansInfosStory)

export const SansInfosMobile = mobileStory(SansInfosStory)

const CompactStory = {
  args: {
    base: {
      ...base,
      followedBy: [{ id: testSessionUser.id }],
    },
    user: testSessionUser,
    compact: true,
  },
}

export const Compact = mediumContainerStory(CompactStory)

export const CompactMobile = mobileStory(CompactStory)
