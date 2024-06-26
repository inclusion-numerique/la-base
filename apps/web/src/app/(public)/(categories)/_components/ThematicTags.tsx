'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { Sorting } from '@app/web/server/search/searchQueryParams'
import { createThematicLink } from '../_helpers/createThematicLink'

// helper for filter() method
const excludeValue = (value: string) => (thematic: string) => thematic !== value

export const ThematicTags = ({
  categoryPath,
  themeOptions,
  selected = [],
  page,
  tri,
  className,
}: {
  categoryPath: string
  themeOptions: { name: string; value: string }[]
  selected: string[]
  page?: number
  tri?: Sorting
  className?: string
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
      {themeOptions.map(({ name, value }) => (
        <li key={name}>
          <Tag
            className={className}
            pressed={activeTags.includes(value)}
            nativeButtonProps={{
              onClick: () =>
                activeTags.includes(value) ? unselect(value) : select(value),
            }}
          >
            {name}
          </Tag>
        </li>
      ))}
    </ul>
  )
}
