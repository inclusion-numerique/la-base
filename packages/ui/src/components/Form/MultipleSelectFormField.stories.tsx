import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import MultipleSelectFormField, {
  MultipleSelectFormFieldProps,
} from './MultipleSelectFormField'
import { SelectOption } from './utils/options'

const choices = Array.from({ length: 20 }, (_, index) => `choice-${index}`) as [
  string,
  ...string[],
]

const objectFormValidation = z
  .object({
    choices: z.array(z.enum(choices)),
  })
  .strict()
type ObjectFormData = z.infer<typeof objectFormValidation>

const Template = ({
  path,
  ...args
}: Omit<MultipleSelectFormFieldProps<ObjectFormData>, 'control'>) => {
  const form = useForm<ObjectFormData>({
    resolver: zodResolver(objectFormValidation),
    reValidateMode: 'onChange',
    mode: 'all',
  })

  return (
    <form>
      <MultipleSelectFormField control={form.control} path={path} {...args} />
    </form>
  )
}

const meta: Meta<typeof MultipleSelectFormField> = {
  title: 'DSFR Component/Form/MultipleSelect',
  component: MultipleSelectFormField,
}

export default meta

type Story = StoryObj<typeof MultipleSelectFormField>

const options: SelectOption[] = [
  {
    label: 'Selectionnez une option',
    value: '',
    disabled: true,
    hidden: true,
  },
  ...choices.map((choice) => ({ label: choice, value: choice })),
]

export const Default: Story = {
  name: 'Liste déroulante',
  render: (args) => <Template {...args} path="choices" />,
  args: {
    label: 'Label',
    options,
  },
}

export const Limited: Story = {
  name: 'Liste déroulante avec limite',
  render: (args) => <Template {...args} path="choices" />,
  args: {
    label: 'Label',
    options,
    limit: 3,
  },
}
