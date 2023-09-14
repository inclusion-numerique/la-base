import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { Resource } from '@app/web/server/resources/getResource'
import styles from './ResourceNavigation.module.css'
import ResourceSideMenu from './ResourceSideMenu'

const {
  Component: ResourceNavigationModal,
  buttonProps: resourceNavigationModalNativeButtonProps,
} = createModal({
  id: 'resourceNavigation',
  isOpenedByDefault: false,
})

const ResourceNavigation = ({
  resource: { slug, contents },
  isContributor,
}: {
  resource: Resource
  isContributor: boolean
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
        className={classNames(
          'fr-btn',
          'fr-btn--secondary',
          'fr-btn--icon-left',
          'fr-icon-edit-line',
        )}
        href={isContributor ? `/ressources/${slug}/editer` : '/'}
      >
        {isContributor ? 'Modifier' : 'Demander à contribuer'}
      </Link>
      <Link
        className={classNames(
          'fr-btn',
          'fr-btn--secondary',
          'fr-btn--icon-left',
          'fr-icon-bookmark-line',
        )}
        href="/"
      >
        Enregistrer
      </Link>
      <Link
        className={classNames(
          'fr-btn',
          'fr-btn--secondary',
          'fr-btn--icon-left',
          'fr-icon-equalizer-line',
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
          className={classNames(
            'fr-btn',
            'fr-btn--secondary',
            'fr-btn--icon-left',
            'fr-icon-edit-line',
            styles.button,
          )}
          href={isContributor ? `/ressources/${slug}/editer` : '/'}
        >
          {isContributor ? 'Modifier' : 'Demander à contribuer'}
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
        <ResourceSideMenu contents={contents} />
      </div>
    </div>
  </>
)

export default ResourceNavigation
