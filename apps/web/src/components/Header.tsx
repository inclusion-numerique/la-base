import Link from 'next/link'
import { PublicWebAppConfig } from '@app/web/webAppConfig'
import { SessionUser } from '@app/web/auth/sessionUser'
import { Route } from 'next'
import { HeaderUserMenu } from '@app/web/components/HeaderUserMenu'
import classNames from 'classnames'

const Header = ({
  user,
  backLink: _backLink,
}: {
  user?: SessionUser | null
  backLink?: Route
}) => (
  <header role="banner" className="fr-header">
    <div className="fr-header__body">
      <div className="fr-container">
        <div className="fr-header__body-row">
          <div className="fr-header__brand fr-enlarge-link">
            <div className="fr-header__brand-top">
              {_backLink ? (
                <Link
                  href={_backLink}
                  className={classNames(
                    'fr-btn',
                    'fr-btn--sm',
                    'fr-btn--tertiary-no-outline',
                  )}
                >
                  <span className="fr-icon-arrow-left-line fr-icon--sm fr-mr-1w" />
                  Retour
                </Link>
              ) : (
                <>
                  <div className="fr-header__logo">
                    <Link
                      href="/"
                      title={PublicWebAppConfig.projectTitle}
                      className="fr-text--medium"
                    >
                      <picture>
                        <img
                          style={{ verticalAlign: 'middle', height: 26 }}
                          src="/images/logo.svg"
                          alt="Logo"
                        />
                      </picture>
                    </Link>
                  </div>
                  <div className="fr-header__operator">
                    <Link href="/" className="fr-text--medium">
                      {PublicWebAppConfig.projectTitle}
                    </Link>
                  </div>
                </>
              )}
              <div className="fr-header__navbar">
                <button
                  id="fr-btn-menu-mobile"
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
                  <Link
                    href="/ressources"
                    className="fr-btn fr-icon-search-line"
                  >
                    Rechercher
                  </Link>
                </li>
                <li>
                  <Link href="/" className="fr-btn fr-icon-edit-box-line">
                    Créer une ressource
                  </Link>
                </li>
                <li>
                  <Link href="/" className="fr-btn" title="Aide">
                    <span className="fr-icon-question-line fr-icon--sm" />
                    <span className="fr-hidden-lg fr-ml-1w">Aide</span>
                  </Link>
                </li>
                <li className="fr-hidden fr-unhidden-lg fr-px-1w fr-pb-5v fr-pt-1v">
                  <span
                    style={{
                      height: '100%',
                      borderLeft: '1px solid var(--border-default-grey)',
                    }}
                  />
                </li>
                <li style={{ position: 'relative' }}>
                  {user ? (
                    <HeaderUserMenu user={user} />
                  ) : (
                    <Link
                      href="/connexion"
                      className="fr-btn fr-icon-user-line"
                    >
                      Se connecter
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modal-menu-mobile" className="fr-header__menu fr-modal">
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
