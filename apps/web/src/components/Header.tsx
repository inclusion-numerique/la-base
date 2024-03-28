import Link from 'next/link'
import React, { ReactNode } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import HeaderBackLink from '@app/web/components/HeaderBackLink'
import { HeaderUserMenu } from '@app/web/components/HeaderUserMenu'
import { HelpMenu } from '@app/web/components/HelpMenu'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'

import LesBasesSvgLogo from '@app/web/components/LesBasesSvgLogo'

const createResourceConnectionLink = (
  <Link
    href="/connexion?suivant=/?creer-une-ressource"
    className="fr-btn fr-icon-edit-box-line"
  >
    Créer une ressource
  </Link>
)

const Header = ({
  user,
  backLink,
  createResource = createResourceConnectionLink,
}: {
  user?: SessionUser | null
  backLink?: boolean
  createResource?: ReactNode
}) => (
  <header role="banner" className="fr-header">
    <div className="fr-header__body">
      <div className="fr-container">
        <div className="fr-header__body-row">
          <div className="fr-header__brand fr-enlarge-link">
            <div className="fr-header__brand-top">
              {backLink ? (
                <HeaderBackLink />
              ) : (
                <>
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
                  <div className="fr-header__operator">
                    <Link href="/" className="fr-text--medium">
                      {PublicWebAppConfig.projectTitle}
                      <span className="fr-sr-only"> - Retour à l’accueil</span>
                    </Link>
                  </div>
                </>
              )}
              <div className="fr-header__navbar">
                <button
                  id="header-mobile-menu-button"
                  data-fr-opened="false"
                  aria-controls="modal-menu-mobile"
                  aria-haspopup="menu"
                  title="Menu"
                  type="button"
                  className="fr-btn--menu fr-btn"
                  data-fr-js-modal-button="true"
                >
                  Menu
                </button>
              </div>
            </div>
          </div>
          <div className="fr-header__tools">
            <div className="fr-header__tools-links">
              <ul className="fr-btns-group">
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
                <li>{createResource}</li>
                <li className="fr-position-relative">
                  <HelpMenu />
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
                    <HeaderUserMenu user={user} />
                  ) : (
                    <Button
                      linkProps={{
                        href: '/connexion',
                      }}
                      iconId="fr-icon-user-line"
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
      id="modal-menu-mobile"
      className="fr-header__menu fr-modal"
      title="Menu"
      aria-labelledby="header-mobile-menu-button"
    >
      <div className="fr-container">
        <button
          aria-controls="modal-menu-mobile"
          className="fr-btn--close fr-btn"
          type="button"
        >
          Fermer
        </button>
        <div className="fr-header__menu-links">
          <ul className="fr-btns-group">
            {/* {menu.map((item) => ( */}
            {/*  <li key={item.name}> */}
            {/*    <Link */}
            {/*      className="fr-btn" */}
            {/*      href={item.href} */}
            {/*      aria-controls="modal-menu-mobile" */}
            {/*    > */}
            {/*      {item.name} */}
            {/*    </Link> */}
            {/*  </li> */}
            {/* ))} */}
          </ul>
        </div>
      </div>
    </div>
  </header>
)

export default Header
