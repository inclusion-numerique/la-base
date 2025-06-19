import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta: Meta<typeof Tabs> = {
  title: 'DSFR Component/Tabs',
  component: Tabs,
}

export default meta

type Story = StoryObj<typeof Tabs>

const Template = () => (
  <Tabs
    tabs={[
      { label: 'Tab 1', content: 'Avec du contenu cool' },
      { label: 'Tab 2', content: 'Avec du contenu encore plus cool' },
    ]}
  />
)

export const Default: Story = {
  name: 'Tabs',
  render: () => <Template />,
}
