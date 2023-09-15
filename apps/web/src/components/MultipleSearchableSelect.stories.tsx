import { Meta, StoryObj } from '@storybook/react'
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
      { name: 'Yo', value: 'Yo' },
      { name: 'Nop', value: 'Nop' },
      { name: 'Cant touch this', value: 'cant', disabled: true },
      { name: 'Yep', value: 'Yep' },
      { name: 'Ohla', value: 'Ohla' },
      { name: 'ahaa', value: 'ahaa' },
    ],
  },
  argTypes: {
    setSelecteds: { action: 'selected' },
  },
}
