import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { EditContentCommandValidation } from '@app/web/server/resources/feature/EditContent'
import { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'
import SectionTitleEdition from './SectionTitleEdition'

export default {
  title: 'Ressource/Content/SectionTitle/Edition',
  component: SectionTitleEdition,
} as Meta<typeof SectionTitleEdition>

type Story = StoryObj<typeof SectionTitleEdition>

const Template = () => {
  const form = useForm<ClientContentPayload>({
    resolver: zodResolver(EditContentCommandValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      title: 'Hello you',
    },
  })

  return (
    <form>
      <SectionTitleEdition form={form} />
    </form>
  )
}

export const Default: Story = {
  name: 'Edition',
  render: () => <Template />,
}
