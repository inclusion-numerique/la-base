'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchBar as DSFRSearchBar } from '@codegouvfr/react-dsfr/SearchBar'
import styles from './SearchBar.module.css'

const SearchBar = ({ query }: { query?: string }) => {
  const router = useRouter()

  const [value, setValue] = useState(query)
  const onSearch = (text: string) => {
    router.push(`/rechercher?q=${encodeURI(text)}`)
  }

  useEffect(() => {
    setValue(query)
  }, [query])

  return (
    <DSFRSearchBar
      big
      className={styles.input}
      onButtonClick={onSearch}
      renderInput={({ className, id, type }) => (
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className={className}
          id={id}
          type={type}
          placeholder="Rechercher une ressource, une base, un profil..."
        />
      )}
    />
  )
}

export default SearchBar
