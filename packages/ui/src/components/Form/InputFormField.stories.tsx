import { useOnDiff } from '@app/web/hooks/useOnDiff'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import InputFormField, { InputFormFieldProps } from './InputFormField'

const objectFormValidation = z
  .object({
    name: z.string(),
    email: z.string().email(),
    email2: z.string().email(),
  })
  .strict()
type ObjectFormData = z.infer<typeof objectFormValidation>

const Template = ({
  path,
  ...args
}: Omit<InputFormFieldProps<ObjectFormData>, 'control'>) => {
  const form = useForm<ObjectFormData>({
    resolver: zodResolver(objectFormValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@gmail.fr',
      email2: 'john.doe',
    },
  })

  useOnDiff(form, () => {
    if (path === 'email' || path === 'email2') {
      form.setValue(path, form.getValues(path), {
        shouldTouch: true,
        shouldValidate: true,
        shouldDirty: true,
      })
      if (path === 'email2') {
        form.setError('email2', { message: 'invalid Email' })
      }
    }
  })

  return (
    <form>
      <InputFormField control={form.control} path={path} {...args} />
    </form>
  )
}

const meta: Meta<typeof InputFormField> = {
  title: 'DSFR Component/Form/Input',
  component: InputFormField,
}

export default meta

type Story = StoryObj<typeof InputFormField>

export const Default: Story = {
  name: 'Etat par défaut',
  render: (args) => <Template {...args} path="name" />,
  args: {
    label: 'Label',
  },
}

export const AvecAsterisque: Story = {
  render: (args) => <Template {...args} path="name" />,
  args: {
    label: 'Label',
    asterisk: true,
  },
}

export const Success: Story = {
  name: 'Etat succès',
  render: (args) => <Template {...args} path="email" />,
  args: {
    label: 'Label',
    valid: 'Email valide',
  },
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: this is the story name
export const Error: Story = {
  name: 'Etat erreur',
  render: (args) => <Template {...args} path="email2" />,
  args: {
    label: 'Label',
  },
}

export const Disabled: Story = {
  name: 'Etat désactivé',
  render: (args) => <Template {...args} path="name" disabled />,
  args: {
    label: 'Label',
    disabled: true,
  },
}

export const Hint: Story = {
  name: "Avec texte d'aide",
  render: (args) => <Template {...args} path="name" />,
  args: {
    label: 'Label',
    hint: 'texte de description additionnel',
  },
}

export const Textarea: Story = {
  name: 'Zone de texte',
  render: (args) => <Template {...args} path="name" />,
  args: {
    label: 'Label',
    type: 'textarea',
    rows: 5,
  },
}

export const Icon: Story = {
  name: 'Avec icone',
  render: (args) => <Template {...args} path="name" />,
  args: {
    label: 'Label',
    icon: 'fr-icon-alert-line',
  },
}
