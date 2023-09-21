import React from 'react'
import classNames from 'classnames'
import Resources from '@app/web/components/Search/Resources'
import Header from '@app/web/components/Search/Header'
import { getResourcesList } from '@app/web/server/resources/getResourcesList'
import { getProfilesCount } from '@app/web/server/profiles/getProfilesList'
import { getBasesCount } from '@app/web/server/bases/getBasesList'
import Menu from '@app/web/components/Search/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import styles from './rechercher.module.css'

const SearchResources = async ({
  searchParams: { q: query },
}: {
  searchParams: { q: string }
}) => {
  const user = await getSessionUser()
  const [resources, basesCount, profilesCount] = await Promise.all([
    getResourcesList({ user, query }),
    getBasesCount({ user, query }),
    getProfilesCount({ user, query }),
  ])

  return (
    <>
      <Header query={query} />
      <Menu
        query={query}
        current="resources"
        resourcesCount={resources.length}
        profilesCount={profilesCount}
        basesCount={basesCount}
      />
      <div className={classNames('fr-container', styles.container)}>
        <Resources resources={resources} user={user} />
      </div>
    </>
  )
}

export default SearchResources
