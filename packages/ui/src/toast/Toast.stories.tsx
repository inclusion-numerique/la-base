import { createToast } from '@app/ui/toast/createToast'
import Toaster from '@app/ui/toast/Toaster'
import Button from '@codegouvfr/react-dsfr/Button'
import { Meta, StoryObj } from '@storybook/nextjs'
import { useEffect } from 'react'

const meta: Meta<typeof Toaster> = {
  title: 'Toasts',
  component: Toaster,
}

export default meta

type Story = StoryObj<typeof Toaster>

const Template = ({ action }: { action?: boolean }) => {
  const actionParams = action
    ? {
        children: 'Action',
        onClick: () =>
          createToast({ priority: 'warning', message: 'Toast inception 🤓' }),
      }
    : undefined

  const onClick = () => {
    createToast({
      priority: 'info',
      message: 'Bonjour le monde',
      action: actionParams,
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: we don't want to trigger the effect  when actionParams change
  useEffect(() => {
    createToast({
      priority: 'success',
      message: 'Un nouveau toast de succès total',
      action: actionParams,
    })
  }, [])

  return (
    <>
      <Toaster />
      <div>
        <Button onClick={onClick}>Open toast</Button>
      </div>
    </>
  )
}

export const Simple: Story = {
  render: () => <Template />,
}

export const Action: Story = {
  render: () => <Template action />,
}
