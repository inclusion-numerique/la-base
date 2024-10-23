'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { ReactNode, useEffect, useRef, useState } from 'react'
import OptionBadge from '@app/ui/components/Form/OptionBadge'
import { useRouter } from 'next/navigation'
import {
  DataTableConfiguration,
  DataTableFilterValues,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'

/**
 * TODO This is not yet implemented
 */
const DataFilters = <Configuration extends DataTableConfiguration>({
  searchParams,
  baseHref,
  searchBar,
  filterComponents,
  initialyShown = false,
  filterValues,
}: {
  initialyShown?: boolean
  searchParams: DataTableSearchParams<Configuration>
  baseHref: string
  searchBar: ReactNode
  filterComponents: ReactNode[]
  filterValues: DataTableFilterValues<Configuration>
}) => {
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFilter = () => {
    // TODO MERGE QUERY PARAAMS
    router.push(`${baseHref}?filter=todo`)
  }

  const [showFilters, setShowFilters] = useState(initialyShown)

  const searchBarRef = useRef<HTMLDivElement>(null)

  // Initialise input value
  useEffect(
    () => {
      if (!searchParams.recherche) {
        return
      }
      const searchBarElement = searchBarRef.current
      if (!searchBarElement) return

      // Find the input element inside searchbar element , and set value to searchQuery

      const input = searchBarElement.querySelector('input')

      if (input) {
        input.value = searchParams.recherche
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const filterValueEntries = Object.entries(filterValues)

  // TODO do this in applyFilter serverside logic not in this component
  const flattenedValueEntries = (
    filterValueEntries as [string, string[]][]
  ).flatMap((entry) => entry[1].map((value) => [entry[0], value]))
  // TODO Have the title of the filter instead of the "name"

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onRemoveFilter = (name: string, value: string) => {
    console.log('REMOVE FILTER', { name, value })
  }

  return (
    <div className="fr-border fr-p-4v fr-p-md-8v">
      <div className="fr-width-full fr-flex">
        {searchBar}
        {filterComponents.length > 0 && (
          <Button
            className="fr-ml-6v"
            priority="secondary"
            type="button"
            iconPosition="right"
            iconId={
              showFilters
                ? 'fr-icon-arrow-up-s-line'
                : 'fr-icon-arrow-down-s-line'
            }
            onClick={() => setShowFilters(!showFilters)}
          >
            Voir les filtres
          </Button>
        )}
      </div>
      {showFilters && (
        <div className="fr-width-full fr-mt-4v fr-mt-md-8v fr-flex fr-align-items-center fr-flex-wrap fr-flex-gap-6v">
          {filterComponents}
        </div>
      )}
      {filterValueEntries.length > 0 && (
        <div className="fr-width-full fr-mt-4v fr-mt-md-6v fr-flex fr-align-items-center fr-flex-wrap fr-flex-gap-2v">
          {flattenedValueEntries.map(([name, value]) => (
            <OptionBadge
              option={{
                label: `${name} : ${value}`,
              }}
              size="sm"
              onClick={() => onRemoveFilter(name, value)}
              key={`${name}_${value}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DataFilters
