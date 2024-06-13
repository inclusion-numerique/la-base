import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import { EditContentCommandValidation } from '@app/web/server/resources/feature/EditContent'
import { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'
import TextContentEdition from './TextContentEdition'

export default {
  title: 'Ressource/Content/Text/Edition',
  component: TextContentEdition,
} as Meta<typeof TextContentEdition>

type Story = StoryObj<typeof TextContentEdition>

const Template = () => {
  const form = useForm<ClientContentPayload>({
    resolver: zodResolver(EditContentCommandValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      text: `<h5>Edit me</h5><p><b>please...</b></p><p>ps: C'est pas encore fou pour <a href='https://tiptap.dev/api/marks/link' target='_blank'>les liens</a>`,
    },
  })

  return (
    <ResourceWrapper>
      <form>
        <TextContentEdition form={form} />
      </form>
    </ResourceWrapper>
  )
}

export const Desktop: Story = {
  render: () => <Template />,
}

export const Mobile = mobileStory(Desktop)
