import React from 'react'
import classNames from 'classnames'
import Header from '@app/web/components/Search/Header'
import { getResourcesCount } from '@app/web/server/resources/getResourcesList'
import { getProfiles } from '@app/web/server/profiles/getProfilesList'
import { getBasesCount } from '@app/web/server/bases/getBasesList'
import Menu from '@app/web/components/Search/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Profiles from '@app/web/components/Search/Profiles'
import styles from '../rechercher.module.css'

const SearchProfiles = async ({
  searchParams: { q: query },
}: {
  searchParams: { q: string }
}) => {
  const user = await getSessionUser()
  const [resourcesCount, basesCount, profiles] = await Promise.all([
    getResourcesCount({ user, query }),
    getBasesCount({ user, query }),
    getProfiles({ user, query }),
  ])

  return (
    <>
      <Header query={query} />
      <Menu
        query={query}
        current="profiles"
        resourcesCount={resourcesCount}
        profilesCount={profiles.length}
        basesCount={basesCount}
      />
      <div className={classNames('fr-container', styles.container)}>
        <Profiles profiles={profiles} />
      </div>
    </>
  )
}

export default SearchProfiles
