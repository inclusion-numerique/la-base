import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
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
    <ResourceWrapper>
      <form>
        <SectionTitleEdition form={form} />
      </form>
    </ResourceWrapper>
  )
}

export const Desktop: Story = {
  render: () => <Template />,
}

export const Mobile = mobileStory(Desktop)
