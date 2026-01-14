'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import Input from '@codegouvfr/react-dsfr/Input'
import classNames from 'classnames'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './List/Resources.module.css'

const ResourcesSearch = ({ initialSearch }: { initialSearch?: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(initialSearch || '')

  useEffect(() => {
    setSearchTerm(initialSearch || '')
  }, [initialSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedSearch = searchTerm.trim()

    const params = new URLSearchParams(searchParams?.toString())

    // Reset to page 1 when searching
    if (params.has('page')) {
      params.delete('page')
    }

    if (trimmedSearch) {
      params.set('search', trimmedSearch)
    } else {
      params.delete('search')
    }

    const query = params.toString()
    router.push(`${pathname}${query ? `?${query}` : ''}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        nativeInputProps={{
          placeholder: 'Rechercher une ressource',
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
        }}
        classes={{ wrap: classNames(styles.searchBar, 'fr-mt-0') }}
        addon={
          <Button
            iconId="ri-search-line"
            className="ri-xl"
            priority="primary"
            title="Rechercher une ressource"
            type="submit"
          />
        }
        label="Rechercher une ressource"
        hideLabel
      />
    </form>
  )
}

export default ResourcesSearch
