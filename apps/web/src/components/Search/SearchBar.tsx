'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { useDebounce, useOnClickOutside } from 'usehooks-ts'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import {
  defaultSearchParams,
  SearchParams,
  searchParamsToUrl,
} from '@app/web/server/search/searchQueryParams'
import { Spinner } from '@app/web/ui/Spinner'
import styles from './SearchBar.module.css'

const SearchBar = ({ searchParams }: { searchParams?: SearchParams }) => {
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>()
  const quickSearchContainerRef = useRef<HTMLDivElement>(null)

  const [inputHasChanged, setInputHasChanged] = useState(false)
  const [query, setQuery] = useState(searchParams?.query ?? '')
  const [quickSearchOpen, setQuickSearchOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 500)

  // Execute search query for 3 or more chars and if the user has changed the input
  const quicksearchQueryEnabled =
    !!debouncedQuery && debouncedQuery.length > 2 && inputHasChanged

  // TODO cache results for same query
  const { isFetching, data: quickSearchResult } =
    trpc.search.quicksearch.useQuery(
      {
        query: debouncedQuery,
      },
      {
        enabled: quicksearchQueryEnabled,
      },
    )

  const goToSearchPage = (searchParamsQuery: string) => {
    router.push(
      searchParamsToUrl({
        ...defaultSearchParams,
        ...searchParams,
        query: searchParamsQuery,
        page: 1,
      }),
    )
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setInputHasChanged(true)
    setQuickSearchOpen(true)
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const input = event.currentTarget.elements.namedItem('search')
    if (!input) {
      return
    }

    goToSearchPage(query)
    event.stopPropagation()
    event.preventDefault()
    setQuickSearchOpen(false)
  }

  // Close quick search on click outside of it
  useOnClickOutside(quickSearchContainerRef, (event) => {
    setQuickSearchOpen(false)
  })

  const onViewAllResults = () => {
    goToSearchPage(query)
    setQuickSearchOpen(false)
  }

  const quickSearchTotalCount = quickSearchResult
    ? quickSearchResult.resourcesCount +
      quickSearchResult.basesCount +
      quickSearchResult.profilesCount
    : 0

  const displayQuickSearch = quickSearchOpen && quicksearchQueryEnabled
  // quickSearchOpen && !!query && (isFetching || quickSearchResult)
  const displayQuickSearchLoader = isFetching
  const displayQuickSearchResults = !isFetching && quickSearchTotalCount > 0
  const displayQuickSearchEmptyResults =
    !isFetching && quickSearchTotalCount === 0

  return (
    <form onSubmit={onSubmit}>
      <div
        className={classNames(
          'fr-search-bar fr-search-bar--lg',
          styles.searchBar,
        )}
        role="search"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={onChange}
          className="fr-input"
          id="search"
          type="search"
          name="search"
          placeholder="Rechercher une ressource, une base, un profil..."
        />
        {displayQuickSearch && (
          <div
            className={styles.resultsContainer}
            ref={quickSearchContainerRef}
          >
            {displayQuickSearchLoader && (
              <div className={styles.loaderContainer}>
                <Spinner className="fr-text-default--grey" />
              </div>
            )}
            {displayQuickSearchResults ? (
              <>
                {quickSearchResult.resourcesCount > 0 && (
                  <div className={styles.results}>
                    <b className="fr-px-2w">Ressources</b>
                    <hr className="fr-mt-3v fr-pb-1w fr-mx-2w" />
                    {quickSearchResult.resources.map((resource) => (
                      <Link
                        key={resource.id}
                        href={`/ressources/${resource.slug}`}
                        className={styles.resource}
                      >
                        {resource.title}
                      </Link>
                    ))}
                  </div>
                )}
                {quickSearchResult.basesCount > 0 && (
                  <div className={styles.results}>
                    <b className="fr-px-2w">Bases</b>
                    <hr className="fr-mt-3v fr-pb-1w fr-mx-2w" />
                    {quickSearchResult.bases.map((base) => (
                      <Link
                        key={base.id}
                        href={`/bases/${base.slug}`}
                        className={styles.base}
                      >
                        <div className={styles.circle} />
                        <span>{base.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {quickSearchResult.profilesCount > 0 && (
                  <div className={styles.results}>
                    <b className="fr-px-2w">Profils</b>
                    <hr className="fr-mt-3v fr-pb-1w fr-mx-2w" />
                    {quickSearchResult.profiles.map((profile) => (
                      <Link
                        key={profile.id}
                        href={`/profils/${profile.id}`}
                        className={styles.profile}
                      >
                        <div className={styles.circle} />
                        {profile.name}
                      </Link>
                    ))}
                  </div>
                )}
                <div className={styles.resultsFooter}>
                  <Button
                    onClick={onViewAllResults}
                    className="fr-m-0"
                    priority="secondary"
                  >
                    Voir tous les résultats ({quickSearchTotalCount})
                  </Button>
                </div>
              </>
            ) : null}
            {displayQuickSearchEmptyResults ? (
              <>Aucun résultat pour votre recherche</>
            ) : null}
          </div>
        )}
        <Button type="submit">Rechercher</Button>
      </div>
    </form>
  )
}

export default withTrpc(SearchBar)
