import {
  PaginationParams,
  paginationParamsToUrl,
  resourcesSortingOptions,
  Sorting,
} from '@app/web/server/search/searchQueryParams'
import { useRouter } from 'next/navigation'
import { ChangeEventHandler, useState } from 'react'
import styles from './ResourcesSorting.module.css'

const ResourcesSortingSelect = ({
  paginationParams,
  baseId,
  slug,
}: {
  paginationParams: PaginationParams
  baseId: string | null
  slug: string
}) => {
  const router = useRouter()

  const [selected, setSelected] = useState<Sorting>(paginationParams.sort)

  const onSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value as Sorting
    setSelected(value)
    const paginationPart = paginationParams
      ? paginationParamsToUrl({ ...paginationParams, sort: value })
      : ''
    const paginationQuery = paginationPart ? `?${paginationPart}` : ''
    const url = baseId
      ? `/bases/${slug}/ressources${paginationQuery}`
      : `/profils/${slug}${paginationQuery}`
    router.push(url)
  }

  return (
    <div className={styles.select}>
      Trier par&nbsp;:
      <select onChange={onSelect} value={selected}>
        {resourcesSortingOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ResourcesSortingSelect
