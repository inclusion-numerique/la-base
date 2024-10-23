import React, { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { Meta, StoryObj } from '@storybook/react'
import { useOnDiff } from '@app/web/hooks/useOnDiff'
import CustomSelectFormField, {
  CustomSelectFormFieldProps,
} from '@app/ui/components/Form/CustomSelectFormField'

const options = [
  {
    label: 'Atman',
    value: 'atman',
  },
  {
    label: 'Brahman',
    value: 'brahman',
  },
  {
    label: 'Dharma',
    value: 'dharma',
  },
  {
    label: 'Karma',
    value: 'karma',
  },
  {
    label: 'Samsara',
    value: 'samsara',
  },
  {
    label: 'Moksha',
    value: 'moksha',
  },
  {
    label: 'Maya',
    value: 'maya',
  },
  {
    label: 'Vedas',
    value: 'vedas',
  },
  {
    label: 'Upanishads',
    value: 'upanishads',
  },
  {
    label: 'Yoga',
    value: 'yoga',
  },
]

const objectFormValidation = z
  .object({
    choice: z.string(),
    choiceError: z.string(),
    choiceSuccess: z.string(),
  })
  .strict()
type ObjectFormData = z.infer<typeof objectFormValidation>

const Template = ({
  path,
  storyAsyncSearch,
  storyAsyncSearchError,
  label = 'Label',
  options: optionsProperty,
  ...args
}: Pick<
  CustomSelectFormFieldProps<ObjectFormData, typeof options>,
  'path' | 'loadOptions' | 'disabled' | 'hint' | 'valid'
> & {
  storyAsyncSearch?: boolean
  storyAsyncSearchError?: boolean
  options?: typeof options
  label?: ReactNode
}) => {
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

  const loadOptions = storyAsyncSearch
    ? ((async (search: string) => {
        // Fake delay to show loading state on the component
        await new Promise((resolve) =>
          // eslint-disable-next-line no-promise-executor-return
          setTimeout(() => {
            resolve(null)
          }, 2000),
        )

        if (storyAsyncSearchError) {
          throw new Error('Erreur de recherche')
        }

        return options.filter((option) =>
          option.label.toLowerCase().includes(search.toLowerCase()),
        )
      }) as never)
    : undefined

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        console.info('Form submited', data)
      })}
    >
      <CustomSelectFormField
        loadOptions={loadOptions}
        control={form.control}
        path={path}
        label={label}
        options={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
          optionsProperty as any
        }
        {...args}
      />
    </form>
  )
}

const meta: Meta<typeof CustomSelectFormField> = {
  title: 'DSFR Component/Form/CustomSelect',
  component: CustomSelectFormField,
}

export default meta

type Story = StoryObj<typeof CustomSelectFormField>

export const Simple: Story = {
  render: () => <Template label="Label" options={options} path="choice" />,
}

// TODO Re-do the story for complex stuff
// Use type: 'commune' ou type: 'structure' to conditinaly render option component

export const RechercheAsynchrone: Story = {
  render: () => <Template storyAsyncSearch path="choice" />,
}

export const Erreur: Story = {
  render: () => <Template options={options} path="choiceError" />,
}

export const Success: Story = {
  render: () => (
    <Template options={options} path="choiceSuccess" valid="Choix valide" />
  ),
}

export const Désactivé: Story = {
  render: () => <Template options={options} path="choice" disabled />,
}

export const TexteAide: Story = {
  render: () => (
    <Template
      options={options}
      path="choice"
      hint="Texte de description additionnel"
    />
  ),
}
