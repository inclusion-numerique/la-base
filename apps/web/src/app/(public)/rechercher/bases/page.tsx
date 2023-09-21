import React from 'react'
import classNames from 'classnames'
import Header from '@app/web/components/Search/Header'
import { getResourcesCount } from '@app/web/server/resources/getResourcesList'
import { getProfilesCount } from '@app/web/server/profiles/getProfilesList'
import { getBases } from '@app/web/server/bases/getBasesList'
import Menu from '@app/web/components/Search/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Bases from '@app/web/components/Search/Bases'
import styles from '../rechercher.module.css'

const SearchBases = async ({
  searchParams: { q: query },
}: {
  searchParams: { q: string }
}) => {
  const user = await getSessionUser()
  const [resourcesCount, bases, profilesCount] = await Promise.all([
    getResourcesCount({ user, query }),
    getBases({ user, query }),
    getProfilesCount({ user, query }),
  ])

  return (
    <>
      <Header query={query} />
      <Menu
        query={query}
        current="bases"
        resourcesCount={resourcesCount}
        profilesCount={profilesCount}
        basesCount={bases.length}
      />
      <div className={classNames('fr-container', styles.container)}>
        <Bases bases={bases} />
      </div>
    </>
  )
}

export default SearchBases
