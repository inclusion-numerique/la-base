import Link from 'next/link'
import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { getUserDisplayName } from '@app/web/utils/user'
import { SessionUser } from '@app/web/auth/sessionUser'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { HeaderUserMenu } from '@app/web/components/HeaderUserMenu'
import { HelpMenu } from '@app/web/components/HelpMenu'
import { Dropdown } from './Dropdown/Dropdown'
import LesBasesSvgLogo from './LesBasesSvgLogo'
import { CreateResourceButton } from './Resource/CreateResourceModal'
import styles from './Header.module.css'

const Header = ({ user }: { user?: SessionUser | null }) => (
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
                  className={classNames(`fr-text--medium`, styles.steps)}
                >
                  {PublicWebAppConfig.projectTitle}
                  <span className="fr-sr-only"> - Retour à l’accueil</span>
                </Link>
              </div>
              <div className="fr-header__navbar fr-unhidden fr-hidden-lg">
                <button
                  type="button"
                  className="fr-btn--menu fr-btn"
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
                <li>
                  <Button
                    linkProps={{
                      href: searchUrl('ressources', defaultSearchParams),
                    }}
                    iconId="fr-icon-search-line"
                  >
                    Rechercher
                  </Button>
                </li>
                <li>
                  {user ? (
                    <CreateResourceButton baseId={null} />
                  ) : (
                    <Link
                      href="/connexion?suivant=/?creer-une-ressource"
                      className="fr-btn fr-icon-edit-box-line"
                    >
                      Créer une ressource
                    </Link>
                  )}
                </li>
                <li>
                  <div
                    data-testid="help-menu-help-center"
                    className="fr-hidden fr-unhidden-lg"
                  >
                    <Dropdown
                      id="header-help-menu"
                      alignRight
                      control={
                        <>
                          <span
                            role="img"
                            className="ri-question-line ri-lg fr-py-1v"
                            aria-hidden
                          />
                          <span className="fr-sr-only">Aide</span>
                        </>
                      }
                    >
                      <HelpMenu />
                    </Dropdown>
                  </div>
                  <div className="fr-hidden-lg">
                    <HelpMenu />
                  </div>
                </li>
                <li className="fr-hidden fr-unhidden-lg fr-px-1w fr-py-1w">
                  <span
                    style={{
                      height: '24px',
                      borderLeft: '1px solid var(--border-default-grey)',
                    }}
                  />
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
  </header>
)

export default Header
