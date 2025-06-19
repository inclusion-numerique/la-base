import { useOnDiff } from '@app/web/hooks/useOnDiff'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import CheckboxFormField, { CheckboxFormFieldProps } from './CheckboxFormField'

const objectFormValidation = z.object({
  choice: z.boolean(),
  choiceSuccess: z.literal(true),
  choiceError: z.boolean().nullish(),
})
type ObjectFormData = z.infer<typeof objectFormValidation>

const Template = ({
  path,
  ...args
}: Omit<CheckboxFormFieldProps<ObjectFormData>, 'control'>) => {
  const form = useForm<ObjectFormData>({
    resolver: zodResolver(objectFormValidation),
    reValidateMode: 'onChange',
    mode: 'all',
  })

  useOnDiff(form, () => {
    form.setValue('choiceSuccess', true, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    })
    form.setError('choiceError', { message: "Message d'erreur" })
  })

  return (
    <form>
      <CheckboxFormField control={form.control} path={path} {...args} />
    </form>
  )
}

const meta: Meta<typeof CheckboxFormField> = {
  title: 'DSFR Component/Form/Checkbox',
  component: CheckboxFormField,
}

export default meta

type Story = StoryObj<typeof CheckboxFormField>

export const Default: Story = {
  name: 'Case à cocher',
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
  },
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: this is the story name
export const Error: Story = {
  name: "État d'erreur",
  render: (args) => <Template {...args} path="choiceError" />,
  args: {
    label: 'Label',
  },
}

export const Success: Story = {
  name: 'État de succès',
  render: (args) => <Template {...args} path="choiceSuccess" />,
  args: {
    label: 'Label',
    valid: 'Choix valide',
  },
}

export const Disabled: Story = {
  name: 'État désactivé',
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    disabled: true,
  },
}

export const Hint: Story = {
  name: "Case à cocher avec texte d'aide",
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    hint: 'Texte de description additionnel',
  },
}
