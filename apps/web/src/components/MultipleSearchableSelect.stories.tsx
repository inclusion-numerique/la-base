import type { Meta, StoryObj } from '@storybook/react'
import MultipleSearchableSelect from './MultipleSearchableSelect'

const meta: Meta<typeof MultipleSearchableSelect> = {
  title: 'component/Multiple Searchable Select',
  component: MultipleSearchableSelect,
}

export default meta

type Story = StoryObj<typeof MultipleSearchableSelect>

export const Default: Story = {
  name: 'Simple searchable select',
  args: {
    placeholder: 'You can search',
    options: [
      { label: 'Yo', value: 'Yo' },
      { label: 'Nop', value: 'Nop' },
      { label: 'Cant touch this', value: 'cant', disabled: true },
      { label: 'Yep', value: 'Yep' },
      { label: 'Ohla', value: 'Ohla' },
      { label: 'ahaa', value: 'ahaa' },
    ],
  },
  argTypes: {
    onSelect: { action: 'selected' },
  },
}
