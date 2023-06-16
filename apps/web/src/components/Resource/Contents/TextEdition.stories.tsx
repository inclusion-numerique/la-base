import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { EditContentCommandValidation } from '@app/web/server/resources/feature/EditContent'
import { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'
import TextEdition from './TextEdition'

export default {
  title: 'Ressource/Content/Text/Edition',
  component: TextEdition,
} as Meta<typeof TextEdition>

type Story = StoryObj<typeof TextEdition>

const Template = () => {
  const form = useForm<ClientContentPayload>({
    resolver: zodResolver(EditContentCommandValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      text: `<h2>Edit me</h2><p><b>please...</b></p><p>ps: C'est pas encore fou pour <a href='https://tiptap.dev/api/marks/link' target='_blank'>les liens</a>`,
    },
  })

  return (
    <form>
      <TextEdition form={form} />
    </form>
  )
}

export const Default: Story = {
  name: 'Edition',
  render: () => <Template />,
}
