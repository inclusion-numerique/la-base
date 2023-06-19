import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import SectionTitleView from './SectionTitleView'

export default {
  title: 'Ressource/Content/SectionTitle/View',
  component: SectionTitleView,
} as Meta<typeof SectionTitleView>

type Story = StoryObj<typeof SectionTitleView>

const Template = (props: ComponentProps<typeof SectionTitleView>) => (
  <ResourceWrapper>
    <SectionTitleView {...props} />
  </ResourceWrapper>
)

const render = (props: ComponentProps<typeof SectionTitleView>) => (
  <Template {...props} />
)

export const Default: Story = {
  name: 'Desktop',
  render,
  args: {
    content: { title: 'Titre de la section' },
  },
}
