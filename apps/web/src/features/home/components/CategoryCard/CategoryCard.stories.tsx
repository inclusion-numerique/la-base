import type { Meta, StoryObj } from '@storybook/react'
import { CategoryCard, type CategoryCardProps } from './CategoryCard'

const args: CategoryCardProps = {
  category: 'Communs & souveraineté',
  resourcesCount: 453,
  thematicCount: 12,
}

const meta = {
  title: "Page d'accueil/Catégorie",
  parameters: {
    layout: 'centered',
    design: [
      {
        type: 'figma',
        name: "Page d'accueil - Carte de catégorie",
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10461-39336',
      },
    ],
  },
  component: CategoryCard,
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryCard>

export default meta
type Story = StoryObj<typeof meta>

export const PublishedInBase: Story = {
  args,
  render: (props) => (
    <div style={{ width: '580px' }}>
      <CategoryCard {...props} />
    </div>
  ),
}
PublishedInBase.storyName = "Page d'accueil - Carte de catégorie"
