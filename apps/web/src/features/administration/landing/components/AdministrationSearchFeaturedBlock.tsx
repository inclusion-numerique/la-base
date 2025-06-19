'use client'

import { withTrpc } from '@app/web/components/trpc/withTrpc'
import AddFeaturedBlockButton from '@app/web/features/administration/landing/components/AddFeaturedBlockButton'
import type {
  BaseResult,
  ProfileResult,
  ResourceResult,
  SearchResult,
  SearchType,
} from '@app/web/features/administration/landing/db/executeFeaturedBlockSearch'
import type { FeaturedBlock } from '@app/web/features/administration/landing/db/getFeaturedBlocksListPageData'
import { trpc } from '@app/web/trpc'
import { Spinner } from '@app/web/ui/Spinner'
import classNames from 'classnames'
import { type ChangeEvent, type RefObject, useRef, useState } from 'react'
import { useDebounceValue, useOnClickOutside } from 'usehooks-ts'
import styles from '../styles/AdministrationSearchFeaturedBlock.module.css'

const AdministrationSearchFeaturedBlock = ({
  type,
  placeholder,
  canAdd,
  onAdd,
}: {
  type: SearchType
  placeholder: string
  canAdd: boolean
  onAdd: (featuredBlock: FeaturedBlock) => void
}) => {
  const [inputHasChanged, setInputHasChanged] = useState(false)
  const [query, setInstantQuery] = useState('')
  const [quickSearchOpen, setQuickSearchOpen] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useDebounceValue(query, 500)
  const quickSearchContainerRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(quickSearchContainerRef as RefObject<HTMLElement>, () => {
    setQuickSearchOpen(false)
  })

  // Execute search query for 3 or more chars and if the user has changed the input
  const quicksearchQueryEnabled =
    !!debouncedQuery && debouncedQuery.length > 2 && inputHasChanged

  const { isFetching, data: quickSearchResult } =
    trpc.featuredBlock.quicksearch.useQuery<SearchResult<typeof type>>(
      {
        query: debouncedQuery,
        type,
      },
      {
        enabled: quicksearchQueryEnabled,
      },
    )

  const setQuery = (value: string) => {
    setInstantQuery(value)
    setDebouncedQuery(value)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setInputHasChanged(true)
    setQuickSearchOpen(true)
  }

  const handleAdd = (featuredBlock: FeaturedBlock) => {
    onAdd(featuredBlock)
    setInstantQuery('')
    setDebouncedQuery('')
    setQuickSearchOpen(false)
  }

  const displayQuickSearch = quickSearchOpen && quicksearchQueryEnabled
  const displayQuickSearchLoader = isFetching
  const displayQuickSearchResults =
    !isFetching && quickSearchResult && quickSearchResult.length > 0
  const displayQuickSearchEmptyResults =
    !isFetching && quickSearchResult && quickSearchResult.length === 0

  return (
    <div className={styles.container}>
      <div
        className={classNames('fr-search-bar fr-search-bar--lg')}
        role="search"
      >
        <input
          value={query}
          onChange={onChange}
          className="fr-input fr-input--white"
          id={type}
          type={type}
          name={type}
          placeholder={placeholder}
        />
      </div>
      {displayQuickSearch && (
        <div
          className={styles.resultsContainer}
          ref={quickSearchContainerRef}
          role="listbox"
        >
          <div className="fr-p-2w">
            {displayQuickSearchLoader && (
              <div className={styles.loaderContainer}>
                <Spinner className="fr-text-default--grey" />
              </div>
            )}
            {displayQuickSearchResults ? (
              <div className="fr-flex fr-direction-column fr-flex-gap-2v">
                {quickSearchResult.map((featuredBlock) => (
                  <div
                    key={featuredBlock.id}
                    className={classNames(
                      'fr-flex fr-justify-content-space-between fr-align-items-center',
                      styles.featuredBlock,
                    )}
                  >
                    <span>
                      {type === 'resource' || type === 'base'
                        ? (featuredBlock as ResourceResult | BaseResult).title
                        : (featuredBlock as ProfileResult).name}
                    </span>
                    <AddFeaturedBlockButton
                      disabled={!canAdd}
                      onAdd={() => handleAdd(featuredBlock)}
                    />
                  </div>
                ))}
              </div>
            ) : null}
            {displayQuickSearchEmptyResults ? (
              <div className="fr-m-4v">Aucun résultat pour votre recherche</div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default withTrpc(AdministrationSearchFeaturedBlock)
