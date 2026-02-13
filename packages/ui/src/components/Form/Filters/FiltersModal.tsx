'use client'

import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import { Button } from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useState } from 'react'
import { FilterCategory } from './FilterCategory'
import type { Category, FilterKey } from './filter'

const modal = createModal({
  id: 'filters-modal',
  isOpenedByDefault: false,
})

export const FiltersModal = ({
  categories,
  onSelect,
  onUnselect,
  selected,
}: {
  categories: Category[]
  onSelect: (option: SelectOption, category: FilterKey) => void
  onUnselect: (option: SelectOption, category: FilterKey) => void
  selected: Set<string>
}) => {
  const [selectedCategory, setSelectedCategory] = useState('')

  useModalVisibility(modal.id, {
    onClosed: () => setSelectedCategory(''),
  })

  return (
    <>
      <modal.Component title="Filtrer par">
        <ul className="fr-raw-list">
          {categories.map((category) => (
            <li key={category.id}>
              {selectedCategory === '' && (
                <Button
                  className="fr-width-full fr-justify-content-center fr-mb-1w"
                  priority="secondary"
                  onClick={() => setSelectedCategory(category.id)}
                  aria-expanded={selectedCategory === category.id}
                >
                  <h2 className="fr-text--md fr-mb-0 fr-text-title--blue-france fr-text--medium">
                    {category.label}
                  </h2>
                </Button>
              )}
              {selectedCategory === category.id && (
                <div>
                  <Button
                    priority="tertiary no outline"
                    onClick={() => setSelectedCategory('')}
                  >
                    <span className="ri-arrow-left-line fr-mr-1w" aria-hidden />
                    Retour au choix des filtres
                  </Button>
                  <hr className="fr-pb-1v fr-mt-1w" />
                  <h2 className="fr-text--md fr-text--bold fr-mx-2w fr-my-1w fr-mb-0">
                    {category.label}
                  </h2>
                  <FilterCategory
                    category={category}
                    onSelect={onSelect}
                    onUnselect={onUnselect}
                    selected={selected}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </modal.Component>
      <Button
        className="fr-width-full fr-justify-content-center"
        priority="secondary"
        onClick={() => modal.open()}
      >
        <span className="ri-filter-3-fill fr-mr-1w" aria-hidden="true" />
        Filtrer
      </Button>
    </>
  )
}
