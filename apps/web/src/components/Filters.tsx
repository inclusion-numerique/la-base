'use client'

import React, { ChangeEvent, useState } from 'react'
import classNames from 'classnames'
import { OptionBadge } from '@app/ui/components/Form/OptionBadge'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import styles from './Filters.module.css'

type Category = { id: string; label: string; options: SelectOption[] }

const Filters = ({
  className,
  label,
  categories,
}: {
  className?: string
  label: string
  categories: Category[]
}) => {
  const [selecteds, setSelecteds] = useState<
    { category: string; option: SelectOption }[]
  >([])

  const onSelect = (
    event: ChangeEvent<HTMLSelectElement>,
    category: string,
  ) => {
    setSelecteds([
      ...selecteds,
      {
        category,
        option: {
          name: event.target.selectedOptions[0].label,
          value: event.target.value,
        },
      },
    ])
  }

  const unselect = ({
    category,
    option,
  }: {
    category: string
    option: SelectOption
  }) => {
    setSelecteds(
      selecteds.filter(
        (selected) =>
          selected.category !== category ||
          selected.option.value !== option.value,
      ),
    )
  }

  return (
    <div className={className}>
      <p className="wip fr-mb-1w">{label}</p>
      <div className={styles.buttons}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={classNames('fr-btn', 'fr-btn--tertiary')}
          >
            <select
              className={styles.select}
              value=""
              onChange={(event) => onSelect(event, category.id)}
            >
              <option hidden value="">
                {category.label}
              </option>
              {category.options
                .filter((option) =>
                  selecteds.every(
                    (selected) =>
                      category.id !== selected.category ||
                      selected.option.value !== option.value,
                  ),
                )
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>
      {selecteds.length > 0 && (
        <div className={styles.selected}>
          {selecteds.map((selected) => (
            <OptionBadge
              size="sm"
              key={`${selected.option.value}-${selected.category}`}
              option={selected.option}
              onClick={() => unselect(selected)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Filters
