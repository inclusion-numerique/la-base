'use client'

import { SelectOption } from '@app/ui/components/Form/utils/options'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { Button } from '@codegouvfr/react-dsfr/Button'
import React, { Fragment, useState } from 'react'
import { Category, FilterKey } from './filter'
import { FilterCategory } from './FilterCategory'

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
        {categories.map((category) => (
          <Fragment key={category.id}>
            {selectedCategory === '' && (
              <Button
                className="fr-width-full fr-justify-content-center fr-mb-1w"
                priority="secondary"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
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
                <div className="fr-text--bold fr-mx-2w fr-my-1w">
                  {category.label}
                </div>
                <FilterCategory
                  category={category}
                  onSelect={onSelect}
                  onUnselect={onUnselect}
                  selected={selected}
                />
              </div>
            )}
          </Fragment>
        ))}
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
