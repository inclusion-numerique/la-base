import { Meta, StoryObj } from '@storybook/nextjs'
import SearchableSelect from './SearchableSelect'

const Commune = ({ commune }: { commune: string }) => (
  <div style={{ color: ' #000091' }}>{commune}</div>
)

const Structure = ({ name, addresse }: { name: string; addresse: string }) => (
  <>
    <div style={{ color: ' #000091' }}>{name}</div>
    <div className="fr-text--sm fr-mb-0">{addresse}</div>
  </>
)

const meta: Meta<typeof SearchableSelect> = {
  title: 'DSFR Component/Searchable Select',
  component: SearchableSelect,
}

export default meta

type Story = StoryObj<typeof SearchableSelect>

export const Default: Story = {
  name: 'Simple searchable select',
  args: {
    placeholder: 'You can search',
    options: [
      { label: 'Yo', value: 'Yo' },
      { label: 'Nop', value: 'Nop' },
      { label: 'Cant touch this', value: 'cant', disabled: true },
      { label: 'Yep', value: 'Yep' },
      { label: 'Ohla', value: 'Ohla' },
      { label: 'ahaa', value: 'ahaa' },
    ],
  },
  argTypes: {
    setSelected: { action: 'selected' },
  },
}

const communes = [
  'Grave 47520 Le passage',
  'Grave 09700 Le Vernet',
  'Seine Saint Denis 93300 Aubervilliers',
  'Paris 75001 Paris',
  "Val d'oise 95380 Villeron",
  "Val d'oise 95380 Louvres",
]
const structures = [
  {
    name: 'CCAS - Espace Gustave Graville',
    addresse: '45 rue de la Plaine 05170 Orcières',
  },
  {
    name: 'Médiathèque Héléne Berr',
    addresse: '45 rue de Picpus 05170 Orcières',
  },
  {
    name: 'Clinique de Camille Connu(e)',
    addresse: 'ici 12345 et la',
  },
  {
    name: 'La mairie stylée',
    addresse: 'rue du centre, ville pas connue',
  },
  {
    name: 'Eglise delabrée',
    addresse: 'milieu du hameau, hameau en question',
  },
  {
    name: 'MJC tendance',
    addresse: 'première a gauche en sortant',
  },
]

export const Complex: Story = {
  name: 'Complex searchable select',
  args: {
    placeholder: 'Rechercher une commune ou une structure',
    categories: [
      {
        name: 'Communes',
        options: communes.map((commune) => ({
          component: <Commune commune={commune} />,
          label: commune,
          value: commune,
        })),
      },
      {
        name: 'Structures',
        options: structures.map((structure) => ({
          component: <Structure {...structure} />,
          label: `${structure.name} ${structure.addresse}`,
          value: structure.name,
        })),
      },
    ],
  },
  argTypes: {
    setSelected: { action: 'selected' },
  },
}
