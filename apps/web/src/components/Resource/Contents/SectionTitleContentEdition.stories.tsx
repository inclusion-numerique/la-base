import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import type { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'
import { EditContentCommandValidation } from '@app/web/server/resources/feature/EditContent'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import SectionTitleContentEdition from './SectionTitleContentEdition'

export default {
  title: 'Ressource/Content/SectionTitle/Edition',
  component: SectionTitleContentEdition,
} as Meta<typeof SectionTitleContentEdition>

type Story = StoryObj<typeof SectionTitleContentEdition>

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
        <SectionTitleContentEdition form={form} />
      </form>
    </ResourceWrapper>
  )
}

export const Desktop: Story = {
  render: () => <Template />,
}

export const Mobile = mobileStory(Desktop)
