'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useOnClickOutside } from 'usehooks-ts'
import { SearchBar as DSFRSearchBar } from '@codegouvfr/react-dsfr/SearchBar'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { QuickSearchResults } from '@app/web/server/search/quicksearch'
import { trpc } from '@app/web/trpc'
import styles from './SearchBar.module.css'

const SearchBar = ({ query }: { query?: string }) => {
  const router = useRouter()

  const [value, setValue] = useState(query)
  const [hasBeenFocused, setHasBeenFocused] = useState(false)
  const [results, setResults] = useState<QuickSearchResults | null>()

  const quickSearchRef = useRef(null)
  useOnClickOutside(quickSearchRef, () => setResults(null))

  const onSearch = (text: string) => {
    router.push(`/rechercher?q=${encodeURI(text)}`)
  }

  const { isFetching } = trpc.search.quicksearch.useQuery(
    {
      query: value,
    },
    {
      onSuccess: setResults,
      enabled: !!value,
    },
  )

  useEffect(() => {
    setValue(query)
    setHasBeenFocused(false)
  }, [query])

  const count = results
    ? results.resourcesCount + results.basesCount + results.profilesCount
    : 0
  return (
    <DSFRSearchBar
      big
      className={styles.input}
      onButtonClick={onSearch}
      renderInput={({ className, id, type }) => (
        <div className={styles.quickSearch} ref={quickSearchRef}>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => setHasBeenFocused(true)}
            onBlur={() => setResults(null)}
            className={className}
            id={id}
            type={type}
            placeholder="Rechercher une ressource, une base, un profil..."
          />
          {hasBeenFocused && value && !isFetching && results && (
            <div className={styles.resultsContainer}>
              {count > 0 ? (
                <>
                  <div className={styles.resultsContent}>
                    {results.resourcesCount > 0 && (
                      <div className={styles.results}>
                        <b className="fr-px-2w">Ressources</b>
                        <hr className="fr-mt-3v fr-pb-1w fr-mx-2w" />
                        {results.resources.map((resource) => (
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
                    {results.basesCount > 0 && (
                      <div className={styles.results}>
                        <b className="fr-px-2w">Bases</b>
                        <hr className="fr-mt-3v fr-pb-1w fr-mx-2w" />
                        {results.bases.map((base) => (
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
                    {results.profilesCount > 0 && (
                      <div className={styles.results}>
                        <b className="fr-px-2w">Profils</b>
                        <hr className="fr-mt-3v fr-pb-1w fr-mx-2w" />
                        {results.profiles.map((profile) => (
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
                  </div>
                  <div className={styles.resultsFooter}>
                    <Link
                      href={`/rechercher?q=${encodeURI(value || '')}`}
                      className="fr-btn fr-btn--secondary"
                    >
                      Voir tous les résultats ({count})
                    </Link>
                  </div>
                </>
              ) : (
                <div className={styles.resultsContent}>
                  Aucun résultat pour votre recherche
                </div>
              )}
            </div>
          )}
        </div>
      )}
    />
  )
}

export default withTrpc(SearchBar)
