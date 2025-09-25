import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { Meta, StoryObj } from '@storybook/react'
import { within } from 'storybook/test'

const { Component: BaseModal, open: openBaseModal } = createModal({
  id: 'base',
  isOpenedByDefault: false,
})

const meta: Meta<typeof BaseModal> = {
  title: 'DSFR Component/Modal',
  component: BaseModal,
}

export default meta

type Story = StoryObj<typeof BaseModal>

const Template = () => (
  <>
    <button type="button" onClick={() => openBaseModal()}>
      Open
    </button>
    <BaseModal
      title=""
      buttons={[
        {
          title: 'Annuler',
          priority: 'tertiary',
          children: 'Annuler',
        },
      ]}
    >
      Hello
    </BaseModal>
  </>
)

export const Default: Story = {
  name: 'Modale mobile',
  render: () => <Template />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await new Promise((resolve) => {
      setTimeout(resolve, 100)
    })
    canvas.getByRole('button').click()
  },
  parameters: {
    chromatic: { delay: 150 },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
