import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import SectionTitleContentView from './SectionTitleContentView'

export default {
  title: 'Ressource/Content/SectionTitle/View',
  component: SectionTitleContentView,
} as Meta<typeof SectionTitleContentView>

type Story = StoryObj<typeof SectionTitleContentView>

const Template = (props: ComponentProps<typeof SectionTitleContentView>) => (
  <ResourceWrapper>
    <SectionTitleContentView {...props} />
  </ResourceWrapper>
)

const render = (props: ComponentProps<typeof SectionTitleContentView>) => (
  <Template {...props} />
)

export const Default: Story = {
  name: 'Desktop',
  render,
  args: {
    content: { title: 'Titre de la section' },
  },
}
