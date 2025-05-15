
'use client'

import type { ResourcesDataTableSearchParams } from '@app/web/app/administration/ressources/ResourcesDataTable'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { usePathname, useRouter } from 'next/navigation'
import { type FormEventHandler, useRef } from 'react'

const AdministrationSearchResource = ({
  searchParams = {},
}: {
  searchParams: ResourcesDataTableSearchParams
}) => {
  const pathname = usePathname()
  const router = useRouter()

  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!formRef.current) return
    const data = new FormData(formRef.current)
    const recherche = data.get('recherche') as string

    const newSearchParams = Object.fromEntries(
      Object.entries({
        ...searchParams,
        recherche,
      }).filter((entry): entry is [string, string] => !!entry[1]),
    )

    const newUrl = `${pathname}?${new URLSearchParams(newSearchParams).toString()}`
    router.push(newUrl, { scroll: false })
  }

  return (
    <form onSubmit={onSubmit} ref={formRef} className="fr-width-full">
      <div
        className={classNames('fr-search-bar fr-search-bar--lg')}
        role="search"
      >
        <input
          defaultValue={searchParams.recherche}
          className="fr-input fr-input--white"
          autoFocus
          id="recherche"
          type="recherche"
          name="recherche"
          placeholder="Rechercher une ressource par titre"
        />

        <Button type="submit">Rechercher</Button>
      </div>
    </form>
  )
}

export default AdministrationSearchResource
