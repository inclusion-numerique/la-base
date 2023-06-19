import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import { EditContentCommandValidation } from '@app/web/server/resources/feature/EditContent'
import { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'
import LinkEdition from './LinkEdition'

export default {
  title: 'Ressource/Content/Link/Edition',
  component: LinkEdition,
} as Meta<typeof LinkEdition>

type Story = StoryObj<typeof LinkEdition>

const Template = () => {
  const form = useForm<ClientContentPayload>({
    resolver: zodResolver(EditContentCommandValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      title: 'Titre du lien',
    },
  })

  return (
    <ResourceWrapper>
      <form>
        <LinkEdition form={form} />
      </form>
    </ResourceWrapper>
  )
}

export const Desktop: Story = {
  render: () => <Template />,
}

export const Mobile = mobileStory(Desktop)
