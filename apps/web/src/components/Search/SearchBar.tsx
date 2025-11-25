'use client'

import BaseImage from '@app/web/components/BaseImage'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  defaultSearchParams,
  searchParamsFromSegment,
  searchTabFromString,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { trpc } from '@app/web/trpc'
import { Spinner } from '@app/web/ui/Spinner'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import type React from 'react'
import { type RefObject, useEffect, useRef, useState } from 'react'
import { useDebounceValue, useOnClickOutside } from 'usehooks-ts'
import styles from './SearchBar.module.css'

const goToNextElement = (
  elements: HTMLAnchorElement[],
  currentIndex: number,
) => {
  if (currentIndex === -1 || currentIndex === elements.length - 1) {
    elements[0]?.focus()
  } else {
    elements[currentIndex + 1]?.focus()
  }
}

const goToPreviousElement = (
  elements: HTMLAnchorElement[],
  currentIndex: number,
) => {
  if (currentIndex <= 0) {
    elements.at(-1)?.focus()
  } else {
    elements[currentIndex - 1]?.focus()
  }
}

const SearchBar = ({
  searchParamsFromUrl,
}: {
  searchParamsFromUrl?: boolean
}) => {
  const [searchSegment, tabSegment] = useSelectedLayoutSegments() as [
    string,
    string,
  ]

  const tab = searchTabFromString(tabSegment)

  const searchParams =
    searchParamsFromUrl && searchSegment
      ? searchParamsFromSegment(searchSegment)
      : undefined

  const router = useRouter()

  useEffect(() => {
    // Prefetch default search route to avoid delay when user clicks on search button
    router.prefetch('/rechercher/ressources/tout')
  }, [router.prefetch])

  const inputRef = useRef<HTMLInputElement>(null)
  const quickSearchContainerRef = useRef<HTMLDivElement>(null)

  const [inputHasChanged, setInputHasChanged] = useState(false)
  const [query, setInstantQuery] = useState(searchParams?.query ?? '')
  const [quickSearchOpen, setQuickSearchOpen] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useDebounceValue(query, 500)

  const setQuery = (value: string) => {
    setInstantQuery(value)
    setDebouncedQuery(value)
  }

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
        // queryKey: ['search.quicksearch', { query: debouncedQuery }],
        enabled: quicksearchQueryEnabled,
      },
    )

  const goToSearchPage = (searchParamsQuery: string) => {
    router.push(
      searchUrl(tab, {
        ...defaultSearchParams,
        ...searchParams,
        query: searchParamsQuery,
      }),
    )
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setInputHasChanged(true)
    setQuickSearchOpen(true)
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const input = event.currentTarget.elements.namedItem(
      'search',
    ) as HTMLInputElement | null

    if (!input) {
      return
    }

    goToSearchPage(query)
    event.stopPropagation()
    event.preventDefault()
    setQuickSearchOpen(false)
  }

  // Close quick search on click outside of it
  // TODO Cancel if click on search bar ?
  useOnClickOutside(quickSearchContainerRef as RefObject<HTMLElement>, () => {
    setQuickSearchOpen(false)
  })

  const quickSearchTotalCount = quickSearchResult
    ? quickSearchResult.resourcesCount +
      quickSearchResult.basesCount +
      quickSearchResult.profilesCount
    : 0

  const displayQuickSearch = quickSearchOpen && quicksearchQueryEnabled
  // quickSearchOpen && !!query && (isFetching || quickSearchResult)
  const displayQuickSearchLoader = isFetching
  const displayQuickSearchResults =
    !isFetching && quickSearchTotalCount > 0 && quickSearchResult
  const displayQuickSearchEmptyResults =
    !isFetching && quickSearchTotalCount === 0

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        event.preventDefault()

        const elements = [
          ...(quickSearchContainerRef.current?.querySelectorAll(
            '[role="option"]',
          ) || []),
        ] as HTMLAnchorElement[]

        const focusedElement = document.activeElement

        if (!focusedElement) {
          return
        }

        const index = elements.indexOf(focusedElement as HTMLAnchorElement)

        if (event.code === 'ArrowDown') {
          goToNextElement(elements, index)
        } else {
          goToPreviousElement(elements, index)
        }
      } else if (event.code === 'Escape') {
        setQuickSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <div className={classNames(styles.container)}>
        <div
          className={classNames('fr-search-bar fr-search-bar--lg')}
          role="search"
          id="search"
        >
          <label className="fr-label" htmlFor="search">
            Rechercher
          </label>
          <input
            ref={inputRef}
            value={query}
            onChange={onChange}
            className={classNames('fr-input fr-input--white', styles.input)}
            id="search-bar"
            type="search"
            name="search"
            placeholder="Rechercher une ressource, une base, un profil..."
          />

          <Button type="submit">Rechercher</Button>
        </div>
        {displayQuickSearch && (
          <div
            className={styles.resultsContainer}
            ref={quickSearchContainerRef}
            role="listbox"
          >
            {displayQuickSearchLoader && (
              <div className={styles.loaderContainer}>
                <Spinner className="fr-text-default--grey" />
              </div>
            )}
            {displayQuickSearchResults ? (
              <>
                <div className={styles.optionsContainer}>
                  {quickSearchResult.resourcesCount > 0 && (
                    <div className={styles.results}>
                      <b>Ressources</b>
                      {quickSearchResult.resources.map((resource) => (
                        <Link
                          role="option"
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
                      <b>Bases</b>
                      {quickSearchResult.bases.map((base) => (
                        <Link
                          role="option"
                          key={base.id}
                          href={`/bases/${base.slug}`}
                          className={styles.base}
                        >
                          <BaseImage
                            className="fr-mr-1w"
                            base={base}
                            size={24}
                          />
                          <span>{base.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {quickSearchResult.profilesCount > 0 && (
                    <div className={styles.results}>
                      <b>Profils</b>
                      {quickSearchResult.profiles.map((profile) => (
                        <Link
                          role="option"
                          key={profile.id}
                          href={`/profils/${profile.slug}`}
                          className={styles.profile}
                        >
                          <RoundProfileImage
                            className="fr-mr-1w"
                            user={profile}
                            size={24}
                          />
                          {profile.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.resultsFooter}>
                  <Button
                    linkProps={{
                      role: 'option',
                      href: searchUrl(tab, {
                        ...defaultSearchParams,
                        ...searchParams,
                        query,
                      }),
                    }}
                    className={styles.allResultsButton}
                    priority="secondary"
                  >
                    Voir tous les résultats ({quickSearchTotalCount})
                  </Button>
                </div>
              </>
            ) : null}
            {displayQuickSearchEmptyResults ? (
              <div className="fr-m-4v">Aucun résultat pour votre recherche</div>
            ) : null}
          </div>
        )}
      </div>
    </form>
  )
}

export default withTrpc(SearchBar)
