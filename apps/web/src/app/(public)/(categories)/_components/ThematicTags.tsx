'use client'

import type { SelectOption } from '@app/ui/components/Form/utils/options'
import ThematicOptionBadge from '@app/web/components/Search/Filters/ThematicOptionBadge'
import type { Sorting } from '@app/web/server/search/searchQueryParams'
import {
  CATEGORY_VARIANTS,
  CATEGORY_VARIANTS_TAG,
  type Category,
} from '@app/web/themes/themes'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createThematicLink } from '../_helpers/createThematicLink'

// helper for filter() method
const excludeValue = (value: string) => (thematic: string) => thematic !== value

export const ThematicTags = ({
  categoryPath,
  themeOptions,
  selected = [],
  page,
  tri,
  category,
}: {
  categoryPath: string
  themeOptions: SelectOption[]
  selected: string[]
  page?: number
  tri?: Sorting
  category: Category
}) => {
  const router = useRouter()
  const [activeTags, setActiveTags] = useState(selected)

  const unselect = (value: string) => {
    const newSelectedTags = activeTags.filter(excludeValue(value))
    setActiveTags(newSelectedTags)

    router.push(createThematicLink(categoryPath, newSelectedTags)(page, tri))
  }

  const select = (value: string) => {
    const newSelectedTags = [...activeTags, value]
    setActiveTags(newSelectedTags)

    router.push(createThematicLink(categoryPath, newSelectedTags)(page, tri), {
      scroll: false,
    })
  }

  return (
    <ul className="fr-tags-group fr-justify-content-center">
      {themeOptions.map(({ label, value }) => {
        const isSelected = activeTags.includes(value)
        const ariaLabelPrefix = isSelected ? 'Retirer' : 'Ajouter'
        const tagClassName = classNames(
          'thematic-badge-base',
          CATEGORY_VARIANTS_TAG[category].default,
          CATEGORY_VARIANTS_TAG[category].hover,
          isSelected && CATEGORY_VARIANTS_TAG[category].border,
        )

        return (
          <li key={value}>
            <ThematicOptionBadge
              option={{ label, disabled: false }}
              categoryIconClassName={classNames(
                CATEGORY_VARIANTS[category].icon,
                CATEGORY_VARIANTS[category].color,
              )}
              textClassName="fr-text-label--grey"
              className={tagClassName}
              onClick={() => (isSelected ? unselect(value) : select(value))}
              ariaLabelPrefix={ariaLabelPrefix}
            />
          </li>
        )
      })}
    </ul>
  )
}
