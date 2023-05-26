import classNames from 'classnames'
import { User } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { Resource } from '@app/web/server/resources/getResource'
import styles from './ResourceNavigation.module.css'
import ResourceSideMenu from './ResourceSideMenu'

const ResourceNavigation = ({
  resource: { slug, contents },
  user,
  visibleRefIndex,
}: {
  resource: Resource
  user: User | null
  visibleRefIndex: number | null
}) => (
  <div className={styles.container}>
    <div className={styles.buttons}>
      <Link
        className={classNames(
          'fr-btn',
          'fr-btn--secondary',
          'fr-btn--icon-left',
          'fr-icon-edit-line',
          styles.button,
        )}
        href={user ? `/ressources/${slug}/editer` : '/'}
      >
        {user ? 'Modifier' : 'Demander à contribuer'}
      </Link>
      <Link
        className={classNames(
          'fr-btn',
          'fr-btn--secondary',
          'fr-btn--icon-left',
          'fr-icon-bookmark-line',
          styles.alwaysVisibleButton,
        )}
        href="/"
      >
        Enregistrer
      </Link>
      <Button
        className="fr-hidden-md"
        title="Plus d'action"
        priority="tertiary no outline"
        iconId="fr-icon-more-fill"
      />
      <Link
        className={classNames(
          'fr-btn',
          'fr-btn--tertiary',
          'fr-btn--icon-left',
          'fr-icon-equalizer-line',
          styles.button,
        )}
        href="/"
      >
        Évaluer
      </Link>
      <Link
        className={classNames(
          'fr-btn',
          'fr-btn--tertiary',
          'fr-btn--icon-left',
          'fr-icon-warning-line',
          styles.button,
        )}
        href="/"
      >
        Signaler
      </Link>
    </div>
    <div className="fr-hidden fr-unhidden-md">
      <ResourceSideMenu visibleRefIndex={visibleRefIndex} contents={contents} />
    </div>
  </div>
)

export default ResourceNavigation
