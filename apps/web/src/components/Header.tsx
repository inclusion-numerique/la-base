import type { SessionUser } from '@app/web/auth/sessionUser'
import { HeaderUserMenu } from '@app/web/components/HeaderUserMenu'
import { getNewsFeedNotifications } from '@app/web/features/fil-d-actualite/db/getNewsFeedNotifications'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { getUserDisplayName } from '@app/web/utils/user'
import Button from '@codegouvfr/react-dsfr/Button'
import Tooltip from '@codegouvfr/react-dsfr/Tooltip'
import classNames from 'classnames'
import Link from 'next/link'
import { Dropdown } from './Dropdown/Dropdown'
import styles from './Header.module.css'
import LesBasesSvgLogo from './LesBasesSvgLogo'
import { CreateResourceButton } from './Resource/CreateResourceModal'

const Header = async ({ user }: { user?: SessionUser | null }) => {
  const notificationsCount = await getNewsFeedNotifications(user)
  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo">
                  <Link
                    href="/"
                    title={PublicWebAppConfig.projectTitle}
                    className="fr-text--medium"
                  >
                    <LesBasesSvgLogo
                      style={{
                        verticalAlign: 'top',
                      }}
                    />
                  </Link>
                </div>
                <div className="fr-header__operator fr-pl-0">
                  <Link
                    href="/"
                    className={classNames(
                      `fr-text--md fr-text--medium`,
                      styles.steps,
                    )}
                  >
                    {PublicWebAppConfig.projectTitle}
                    <span className="fr-sr-only"> - Retour à l’accueil</span>
                  </Link>
                </div>
                <div className="fr-header__navbar fr-unhidden fr-hidden-lg">
                  <button
                    type="button"
                    className={classNames(
                      'fr-btn--menu fr-btn',
                      styles.mobileMenuButton,
                    )}
                    data-fr-opened="false"
                    aria-controls="header-modal"
                    aria-haspopup="menu"
                    id="header-modal-button"
                    title="Menu"
                  >
                    Menu
                  </button>
                </div>
              </div>
            </div>
            <div className="fr-header__tools">
              <div className="fr-header__tools-links">
                <ul className="fr-btns-group fr-align-items-center">
                  <li className="fr-px-md-0 fr-px-2w">
                    <Button
                      linkProps={{
                        href: searchUrl('ressources', defaultSearchParams),
                      }}
                    >
                      <span
                        className="fr-hidden-lg ri-search-line fr-mr-1w fr-text-label--blue-france"
                        aria-hidden
                      />
                      Rechercher
                      <span
                        className="fr-hidden fr-unhidden-lg ri-search-line fr-ml-1w fr-text-label--blue-france"
                        aria-hidden
                      />
                    </Button>
                  </li>
                  <li className="fr-px-md-0 fr-px-2w">
                    {user ? (
                      <CreateResourceButton baseId={null} />
                    ) : (
                      <Link
                        href="/connexion?suivant=/?creer-une-ressource"
                        className="fr-btn"
                      >
                        <span
                          className="fr-hidden-lg ri-edit-box-line fr-mr-1w fr-text-label--blue-france"
                          aria-hidden
                        />
                        Créer une ressource
                        <span
                          className="fr-hidden fr-unhidden-lg ri-edit-box-line fr-ml-1w fr-text-label--blue-france"
                          aria-hidden
                        />
                      </Link>
                    )}
                  </li>
                  <li className="fr-px-md-0 fr-px-2w">
                    <Link
                      data-testid="help-center-link"
                      className="fr-btn fr-btn--no-after"
                      href="https://docs.numerique.gouv.fr/docs/a4351149-5e64-403b-a93f-2ac86e4c1043/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span
                        className="fr-hidden-lg ri-question-line fr-mr-1w fr-text-label--blue-france"
                        aria-hidden
                      />
                      Aide
                      <span
                        className="fr-hidden fr-unhidden-lg ri-question-line fr-ml-1w fr-text-label--blue-france"
                        aria-hidden
                      />
                    </Link>
                  </li>
                  <li className="fr-position-relative fr-hidden fr-unhidden-sm">
                    <Tooltip title="Fil d'actualité">
                      {!!notificationsCount && (
                        <>
                          <div className={styles.notificationsContainer} />
                          <div className={styles.notificationsCount}>
                            {notificationsCount}
                          </div>
                        </>
                      )}
                      <Button
                        data-testid="news-feed-button"
                        className={classNames(
                          'fr-border-radius--8 fr-p-0',
                          styles.newsFeedButton,
                        )}
                        linkProps={{
                          href: user
                            ? !user.newsFeed ||
                              !user.newsFeed.hasCompleteOnboarding
                              ? '/fil-d-actualite/onboarding'
                              : '/fil-d-actualite'
                            : '/connexion?suivant=/fil-d-actualite',
                        }}
                        size="small"
                      >
                        <span
                          className={classNames(
                            'ri-flashlight-fill fr-text--sm',
                            styles.newsFeedIcon,
                          )}
                        />
                      </Button>
                    </Tooltip>
                  </li>
                  <li className="fr-position-relative">
                    {user ? (
                      <>
                        <div className="fr-hidden fr-unhidden-lg">
                          <Dropdown
                            id="header_user_menu"
                            alignRight
                            control={getUserDisplayName(user)}
                          >
                            <HeaderUserMenu user={user} />
                          </Dropdown>
                        </div>
                        <div className="fr-hidden-lg">
                          <HeaderUserMenu user={user} />
                        </div>
                      </>
                    ) : (
                      <Button
                        className="fr-px-md-0 fr-px-2w"
                        linkProps={{
                          href: '/connexion',
                        }}
                        iconId="fr-icon-account-circle-line"
                      >
                        Se connecter
                      </Button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fr-header__menu fr-modal"
        id="header-modal"
        aria-labelledby="header-modal-button"
      >
        <button
          type="button"
          className="fr-btn--close fr-btn fr-hidden-sm"
          aria-controls="header-modal"
          title="Fermer"
        >
          Fermer
        </button>
        <div className="fr-header__menu-links" />
      </div>
    </header>
  )
}

export default Header
