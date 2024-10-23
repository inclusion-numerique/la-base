'use client'

import { useRouter } from 'next/navigation'
import type { FormEventHandler } from 'react'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { createDataTableHref } from '@app/web/data-table/createDataTableHref'
import type { PaginationNavProps } from '@app/web/data-table/PaginationNav'

const PageSizeSelect = ({
  searchParams,
  baseHref,
  className,
  defaultPageSize,
  pageSizeOptions,
}: PaginationNavProps & {
  pageSizeOptions: SelectOption[]
  defaultPageSize: number
}) => {
  const router = useRouter()

  const onChange: FormEventHandler<HTMLSelectElement> = (event) => {
    const element = event.target as HTMLSelectElement | undefined
    if (!element) return

    router.push(
      createDataTableHref({
        baseHref,
        searchParams: {
          ...searchParams,
          lignes: element.value,
          page: '1',
        },
      }),
    )
  }

  const defaultValue = searchParams.lignes ?? defaultPageSize.toString(10)

  return (
    <div className={className}>
      <select
        className="fr-select fr-select--white"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {pageSizeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PageSizeSelect
