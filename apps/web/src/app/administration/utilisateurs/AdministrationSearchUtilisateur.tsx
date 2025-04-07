'use client'

import type { UtilisateursDataTableSearchParams } from '@app/web/app/administration/utilisateurs/UtilisateursDataTable'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { usePathname, useRouter } from 'next/navigation'
import { FormEventHandler, useRef } from 'react'

const AdministrationSearchUtilisateur = ({
  searchParams = {},
}: {
  searchParams?: UtilisateursDataTableSearchParams
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
          placeholder="Rechercher un utilisateur par nom ou email"
        />

        <Button type="submit">Rechercher</Button>
      </div>
    </form>
  )
}

export default AdministrationSearchUtilisateur
