import React from 'react'
import classNames from 'classnames'
import { Theme } from '@prisma/client'
import Resources from '@app/web/components/Search/Resources'
import Header from '@app/web/components/Search/Header'
import { getResourcesList } from '@app/web/server/resources/getResourcesList'
import { getProfilesCount } from '@app/web/server/profiles/getProfilesList'
import { getBasesCount } from '@app/web/server/bases/getBasesList'
import Menu from '@app/web/components/Search/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import styles from './rechercher.module.css'

const SearchResources = async ({
  searchParams: { q: query, themes },
}: {
  searchParams: { q: string; themes: Theme[] | Theme }
}) => {
  const user = await getSessionUser()

  const themesArray = typeof themes === 'string' ? [themes] : themes
  const [resources, basesCount, profilesCount] = await Promise.all([
    getResourcesList({
      user,
      query,
      themes: themesArray,
    }),
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
        <Resources
          basePath="/rechercher"
          query={query}
          resources={resources}
          user={user}
          themes={themesArray}
        />
      </div>
    </>
  )
}

export default SearchResources
