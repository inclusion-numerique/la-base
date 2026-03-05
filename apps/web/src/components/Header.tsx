import ExternalLink from '@app/ui/components/ExternalLink'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { HeaderUserMenu } from '@app/web/components/HeaderUserMenu'
import NewsFeedBadge from '@app/web/features/fil-d-actualite/components/NewsFeedBadge'
import HeaderUserMobileNotificationsButton from '@app/web/features/notifications/components/HeaderUserMobileNotificationsButton'
import HeaderUserMobileNotificationsModal from '@app/web/features/notifications/components/HeaderUserMobileNotificationsModal'
import HeaderUserNotificationsDropdown from '@app/web/features/notifications/components/HeaderUserNotificationsDropdown'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { searchId } from '@app/web/utils/skipLinks'
import { getUserDisplayName } from '@app/web/utils/user'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import Link from 'next/link'
import { Dropdown } from './Dropdown/Dropdown'
import styles from './Header.module.css'
import LesBasesSvgLogo from './LesBasesSvgLogo'
import { CreateResourceButton } from './Resource/CreateResourceModal'

const Header = ({
  user,
  className = 'fr-container',
}: {
  user?: SessionUser | null
  className?: string
}) => (
  <header role="banner" className="fr-header">
    <div className="fr-header__body">
      <div className={className}>
        <div className="fr-header__body-row">
          <div className="fr-header__brand fr-enlarge-link">
            <div className="fr-header__brand-top">
              <div className="fr-header__logo">
                <Link href="/" className="fr-text--medium">
                  <LesBasesSvgLogo
                    style={{
                      verticalAlign: 'top',
                    }}
                  />
                  <span className="fr-sr-only">
                    {PublicWebAppConfig.projectTitle} - Retour à la page
                    d&apos;accueil
                  </span>
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
                  <span className="fr-hidden fr-unhidden-md">
                    {PublicWebAppConfig.projectTitle}
                  </span>
                  <span className="fr-text--sm fr-hidden-sm">
                    {PublicWebAppConfig.projectTitle}
                  </span>
                  <span className="fr-sr-only"> - Retour à l’accueil</span>
                </Link>
              </div>
              <div className="fr-header__navbar fr-unhidden fr-hidden-lg">
                <nav role="navigation" aria-label="Navigation principale">
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
                </nav>
              </div>
            </div>
          </div>
          <div className="fr-header__tools">
            <div className="fr-header__tools-links">
              <nav role="navigation" aria-label="Navigation principale">
                <ul className="fr-btns-group fr-align-items-center">
                  <li className="fr-px-md-0 fr-px-2w fr-hidden-lg">
                    <Button
                      linkProps={{
                        href: user
                          ? !user.newsFeed ||
                            !user.newsFeed.hasCompleteOnboarding
                            ? '/fil-d-actualite/onboarding'
                            : '/fil-d-actualite/tout'
                          : '/connexion?suivant=/fil-d-actualite/tout',
                        'aria-label': "Accès au fil d'actualité",
                      }}
                    >
                      <span
                        className="fr-hidden-lg ri-flashlight-line fr-mr-1w fr-text-label--blue-france"
                        aria-hidden
                      />
                      Fil d'actualité
                      <span
                        className="fr-hidden fr-unhidden-lg ri-flashlight-line fr-ml-1w fr-text-label--blue-france"
                        aria-hidden
                      />
                      {user && (
                        <span
                          className={classNames(
                            'fr-text--sm fr-border-radius--8 fr-p-1w fr-flex fr-align-items-center fr-flex-gap-1v fr-ml-1w',
                            styles.newsFeedIcon,
                            styles.newsFeedButton,
                          )}
                        >
                          <span className="ri-flashlight-fill" aria-hidden />
                          <NewsFeedBadge
                            className={classNames(
                              styles.newsFeedIcon,
                              'fr-text--sm fr-text--bold',
                            )}
                          />
                        </span>
                      )}
                    </Button>
                  </li>
                  <li className="fr-px-md-0 fr-px-2w" id={searchId}>
                    <Button
                      linkProps={{
                        href: searchUrl('ressources', defaultSearchParams),
                        'aria-label': 'Rechercher une ressource',
                        'aria-current': 'page',
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
                        aria-label="Créer une ressource"
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
                  {user && <HeaderUserMobileNotificationsButton />}
                  <li className="fr-px-md-0 fr-px-2w">
                    <ExternalLink
                      data-testid="help-center-link"
                      className="fr-btn fr-btn--no-after"
                      href="https://docs.numerique.gouv.fr/docs/a4351149-5e64-403b-a93f-2ac86e4c1043/"
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
                    </ExternalLink>
                  </li>
                  <li className="fr-position-relative fr-hidden fr-unhidden-lg fr-px-md-0 fr-px-2w">
                    <Button
                      data-testid="news-feed-button"
                      className={classNames(
                        styles.headerNewsFeedButton,
                        'fr-p-0 fr-border-radius--8',
                      )}
                      linkProps={{
                        href: user
                          ? !user.newsFeed ||
                            !user.newsFeed.hasCompleteOnboarding
                            ? '/fil-d-actualite/onboarding'
                            : '/fil-d-actualite/tout'
                          : '/connexion?suivant=/fil-d-actualite/tout',
                        'aria-label': "Accès au fil d'actualité",
                      }}
                      size="small"
                    >
                      <span
                        className={classNames(
                          'fr-text--sm fr-border-radius--8 fr-p-1w fr-flex fr-align-items-center fr-flex-gap-1v',
                          styles.newsFeedIcon,
                          styles.newsFeedButton,
                        )}
                      >
                        <span className="ri-flashlight-fill" aria-hidden />
                        {user && (
                          <NewsFeedBadge className="fr-text--sm fr-text--bold" />
                        )}
                      </span>
                      <span
                        className={classNames(styles.newsFeedLabel, 'fr-ml-1v')}
                      >
                        Fil d'actualité
                      </span>
                    </Button>
                  </li>
                  {user && (
                    <li className="fr-position-relative">
                      <HeaderUserNotificationsDropdown user={user} />
                    </li>
                  )}
                </ul>
              </nav>
              <nav role="navigation" aria-label="Navigation secondaire">
                <ul className="fr-btns-group fr-align-items-center">
                  <li className="fr-position-relative">
                    {user ? (
                      <>
                        <div
                          className={classNames(
                            'fr-hidden fr-unhidden-lg',
                            styles.headerDropdown,
                          )}
                        >
                          <Dropdown
                            id="header_user_menu"
                            alignRight
                            control={
                              <>
                                {getUserDisplayName(user)}
                                <span className="fr-sr-only">
                                  {' '}
                                  - Mon profil
                                </span>
                              </>
                            }
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
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="fr-header__menu fr-modal"
      id="header-modal"
      aria-label="Menu mobile"
      role="menu"
    >
      <div className="fr-container">
        <button
          type="button"
          className="fr-btn--close fr-btn"
          aria-controls="header-modal"
          title="Fermer"
        >
          Fermer
        </button>
        <div className="fr-header__menu-links" />
      </div>
    </div>
    {user && <HeaderUserMobileNotificationsModal user={user} />}
  </header>
)

export default Header
