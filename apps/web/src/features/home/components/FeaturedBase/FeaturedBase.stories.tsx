import { generateBaseExcerpt } from '@app/web/bases/baseExcerpt'
import type { BaseProfileListItem } from '@app/web/server/bases/getBasesList'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { FeaturedBase } from './FeaturedBase'

const meta = {
  title: "Page d'accueil/Base à la une",
  parameters: {
    layout: 'centered',
    design: [
      {
        type: 'figma',
        name: "Page d'accueil - Base à la une",
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10461-39435',
      },
    ],
  },
  component: FeaturedBase,
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedBase>

export default meta
type Story = StoryObj<typeof meta>

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
  _count: { resources: 8, followedBy: 4, resourcesViews: 10 },
} satisfies BaseProfileListItem

export const FeaturedBaseCard: Story = {
  args: { base, user: null },
  render: (args) => (
    <div style={{ width: '380px' }}>
      <FeaturedBase {...args} />
    </div>
  ),
}
FeaturedBaseCard.storyName = "Page d'accueil - Base à la une"
