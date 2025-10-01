import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import {
  SectionTitlePayload,
  SectionTitlePayloadCommandValidation,
} from '@app/web/server/resources/feature/Content'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { useForm } from 'react-hook-form'
import SectionTitleContentEdition from './SectionTitleContentEdition'

export default {
  title: 'Ressource/Content/SectionTitle/Edition',
  component: SectionTitleContentEdition,
} as Meta<typeof SectionTitleContentEdition>

type Story = StoryObj<typeof SectionTitleContentEdition>

const Template = () => {
  const form = useForm<SectionTitlePayload>({
    resolver: zodResolver(SectionTitlePayloadCommandValidation),
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
