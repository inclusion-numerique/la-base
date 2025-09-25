import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import {
  LinkPayload,
  LinkPayloadCommandValidation,
} from '@app/web/server/resources/feature/Content'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import LinkEdition from './LinkContentEdition'

export default {
  title: 'Ressource/Content/Link/Edition',
  component: LinkEdition,
} as Meta<typeof LinkEdition>

type Story = StoryObj<typeof LinkEdition>

const Template = () => {
  const form = useForm<LinkPayload>({
    resolver: zodResolver(LinkPayloadCommandValidation),
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
