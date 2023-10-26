import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { Resource } from '@app/web/server/resources/getResource'
import { SessionUser } from '@app/web/auth/sessionUser'
import SaveResourceInCollectionButton from '../SaveResourceInCollectionButton'
import styles from './ResourceNavigation.module.css'
import ResourceSideMenu from './ResourceSideMenu'

const {
  Component: ResourceNavigationModal,
  buttonProps: resourceNavigationModalNativeButtonProps,
} = createModal({
  id: 'resource-navigation',
  isOpenedByDefault: false,
})

const ResourceNavigation = ({
  resource,
  user,
  isAdmin,
}: {
  resource: Resource
  user: SessionUser | null
  isAdmin: boolean
}) => (
  <>
    <ResourceNavigationModal
      className={styles.modal}
      title=""
      buttons={[
        {
          title: 'Annuler',
          priority: 'tertiary',
          children: 'Annuler',
        },
      ]}
    >
      <Link
        className={
          isAdmin
            ? classNames(
                'fr-btn',
                'fr-btn--secondary',
                'fr-btn--icon-left',
                'fr-icon-edit-line',
              )
            : classNames(
                'fr-btn',
                'fr-btn--secondary',
                'fr-btn--icon-left',
                'fr-icon-edit-line',
                'wip',
              )
        }
        href={isAdmin ? `/ressources/${resource.slug}/editer` : '/'}
      >
        {isAdmin ? 'Modifier' : 'Demander à contribuer'}
      </Link>
      <SaveResourceInCollectionButton
        resourceId={resource.id}
        id="mobile-modal"
        user={user}
      />
      <Link
        className={classNames(
          'fr-btn',
          'fr-btn--secondary',
          'fr-btn--icon-left',
          'fr-icon-equalizer-line',
          'wip',
        )}
        href="/"
      >
        Évaluer
      </Link>
      <Link
        className={classNames(
          'fr-btn',
          'fr-btn--secondary',
          'fr-btn--icon-left',
          'fr-icon-warning-line',
          'wip',
        )}
        href="/"
      >
        Signaler
      </Link>
    </ResourceNavigationModal>
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Link
          data-testid="resource-edition-button"
          className={
            isAdmin
              ? classNames(
                  'fr-btn',
                  'fr-btn--secondary',
                  'fr-btn--icon-left',
                  'fr-icon-edit-line',
                  styles.button,
                )
              : classNames(
                  'fr-btn',
                  'fr-btn--secondary',
                  'fr-btn--icon-left',
                  'fr-icon-edit-line',
                  styles.button,
                  'wip',
                )
          }
          href={isAdmin ? `/ressources/${resource.slug}/editer` : '/'}
        >
          {isAdmin ? 'Modifier' : 'Demander à contribuer'}
        </Link>
        <SaveResourceInCollectionButton
          resourceId={resource.id}
          user={user}
          className={styles.button}
        />
        <Button
          size="large"
          className="fr-hidden-md"
          title="Plus d'action"
          priority="tertiary no outline"
          iconId="fr-icon-more-fill"
          {...resourceNavigationModalNativeButtonProps}
        />
        <Link
          className={classNames(
            'fr-btn',
            'fr-btn--tertiary',
            'fr-btn--icon-left',
            'fr-icon-equalizer-line',
            styles.button,
            'wip',
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
            'wip',
          )}
          href="/"
        >
          Signaler
        </Link>
      </div>
      <div className="fr-hidden fr-unhidden-md">
        <ResourceSideMenu resource={resource} />
      </div>
    </div>
  </>
)

export default ResourceNavigation
