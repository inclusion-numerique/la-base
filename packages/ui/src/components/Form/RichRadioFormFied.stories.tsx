import RichRadioFormField, {
  RichRadioFormFieldProps,
} from '@app/ui/components/Form/RichRadioFormField'
import { useOnDiff } from '@app/web/hooks/useOnDiff'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { Meta, StoryObj } from '@storybook/nextjs'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { RichRadioOption } from './utils/options'

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
}: Omit<RichRadioFormFieldProps<ObjectFormData>, 'control'>) => {
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
    form.setError('choiceError', { message: 'Choice is required' })
  })

  return (
    <form>
      <RichRadioFormField control={form.control} path={path} {...args} />
    </form>
  )
}

const meta: Meta<typeof RichRadioFormField> = {
  title: 'DSFR Component/Form/RichRadio',
  component: RichRadioFormField,
}

export default meta

type Story = StoryObj<typeof RichRadioFormField>

const options: RichRadioOption[] = [
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
  name: 'Liste verticale',
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    options,
  },
}

export const WithImage: Story = {
  name: 'Liste verticale avec image',
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    options: options.map((option) => ({
      ...option,
      image: 'https://via.placeholder.com/150',
    })),
  },
}

export const Inline: Story = {
  name: 'Liste horizontale',
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    options,
    inline: true,
  },
}

export const Hint: Story = {
  name: "Liste avec texte d'aide",
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    options,
    hint: 'Texte de description additionnel',
  },
}

export const Hints: Story = {
  name: "Liste avec textes d'aide",
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    options: options.map((option) => ({
      ...option,
      hint: `Aide pour ${option.label}`,
    })),
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
  name: 'État succès',
  render: (args) => <Template {...args} path="choiceSuccess" />,
  args: {
    label: 'Label',
    options,
    valid: 'Choix valide',
  },
}

export const Disabled: Story = {
  name: 'État désactivé',
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    options,
    disabled: true,
  },
}
