import Link from 'next/link'
import { PublicHeaderNav } from '@app/web/app/(public)/PublicHeaderNav'
import { PublicWebAppConfig } from '@app/web/webAppConfig'
import { menu } from './menu'

const PublicHeader = () => (
  <header role="banner" className="fr-header">
    <div className="fr-header__body">
      <div className="fr-container">
        <div className="fr-header__body-row">
          <div className="fr-header__brand fr-enlarge-link">
            <div className="fr-header__brand-top">
              <div className="fr-header__logo">
                <Link
                  href="/"
                  aria-current="page"
                  target="_self"
                  title={process.env.NEXT_PUBLIC_APP_NAME}
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
            <div className="fr-header__service fr-pl-0">
              <Link
                href="/"
                aria-current="page"
                target="_self"
                title={PublicWebAppConfig.projectTitle}
              >
                <p className="fr-text--medium">
                  {PublicWebAppConfig.projectTitle}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="fr-header__menu fr-modal" id="fr-menu-mobile">
      <div className="fr-container">
        <button
          type="button"
          className="fr-btn--close fr-btn"
          aria-controls="fr-menu-mobile"
        >
          Fermer
        </button>
        <div className="fr-header__menu-links">
          <ul className="fr-btns-group" />
        </div>
        <nav className="fr-nav" id="fr-navigation" aria-label="Menu principal">
          <PublicHeaderNav />
        </nav>
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
            {menu.map((item) => (
              <li key={item.name}>
                <Link
                  className="fr-btn"
                  href={item.href}
                  aria-controls="modal-menu-mobile"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </header>
)

export default PublicHeader
