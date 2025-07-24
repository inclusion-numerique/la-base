import { useOnDiff } from '@app/web/hooks/useOnDiff'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import SelectFormField, { SelectFormFieldProps } from './SelectFormField'
import { SelectOption } from './utils/options'

const objectFormValidation = z
  .object({
    choice: z.enum(['choice-1', 'choice-2', 'choice-3']),
    choiceError: z.enum(['choice-1', 'choice-2', 'choice-3']),
    choiceSuccess: z.enum(['choice-1', 'choice-2', 'choice-3']),
  })
  .strict()
type ObjectFormData = z.infer<typeof objectFormValidation>

const Template = ({
  path,
  ...args
}: Omit<SelectFormFieldProps<ObjectFormData>, 'control'>) => {
  const form = useForm<ObjectFormData>({
    resolver: zodResolver(objectFormValidation),
    reValidateMode: 'onChange',
    mode: 'all',
  })

  useOnDiff(form, () => {
    form.setValue('choiceSuccess', 'choice-2', {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    })
    form.setError('choiceError', { message: "Message d'erreur" })
  })

  return (
    <form>
      <SelectFormField control={form.control} path={path} {...args} />
    </form>
  )
}

const meta: Meta<typeof SelectFormField> = {
  title: 'DSFR Component/Form/Select',
  component: SelectFormField,
}

export default meta

type Story = StoryObj<typeof SelectFormField>

const options: SelectOption[] = [
  {
    label: 'Selectionnez une option',
    value: '',
    disabled: true,
    hidden: true,
  },
  {
    label: 'Choix 1',
    value: 'choice-1',
  },
  {
    label: 'Choix 2',
    value: 'choice-2',
  },
  {
    label: 'Choix 3',
    value: 'choice-3',
  },
]

export const Default: Story = {
  name: 'Liste déroulante',
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    options,
  },
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: this is the story name
export const Error: Story = {
  name: "État d'erreur",
  render: (args) => <Template {...args} path="choiceError" />,
  args: {
    label: 'Label',
    options,
  },
}

export const Success: Story = {
  name: 'État de succès',
  render: (args) => <Template {...args} path="choiceSuccess" />,
  args: {
    label: 'Label',
    valid: 'Choix valide',
    options,
  },
}

export const Disabled: Story = {
  name: 'État désactivé',
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    disabled: true,
    options,
  },
}

export const Hint: Story = {
  name: "Liste avec texte d'aide",
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    hint: 'Texte de description additionnel',
    options,
  },
}
