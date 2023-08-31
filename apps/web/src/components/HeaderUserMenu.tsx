'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { KeyboardEvent, MouseEvent as ReactMouseEvent, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { SessionUser } from '@app/web/auth/sessionUser'
import { getUserDisplayName } from '@app/web/utils/user'
import styles from './HeaderUserMenu.module.css'

export const HeaderUserMenu = ({ user }: { user: SessionUser }) => {
  const bases = user.ownedBases

  // The click outside default behavior from dsfr js do not work in this case 🤷‍
  // So we have to use client component and hooks to handle the click outside
  const buttonRef = useRef<HTMLButtonElement>(null)
  const collapseRef = useRef<HTMLDivElement>(null)
  const displayName = getUserDisplayName(user)
  const onClickOrEnterInsideDropdown = (
    event: KeyboardEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement>,
  ) => {
    // Close the dropdown if a link has been clicked
    if (event.target instanceof HTMLAnchorElement) {
      buttonRef.current?.click()
    }
  }
  const onClickOutsideDropdown = (event: MouseEvent) => {
    // Let the event propagate if clicked on the control button
    if (event.target === buttonRef?.current) {
      return
    }

    // Close the dropdown if open on outside click
    if (buttonRef.current?.getAttribute('aria-expanded') !== 'true') {
      return
    }

    buttonRef.current.click()
  }
  useOnClickOutside(collapseRef, onClickOutsideDropdown)

  const menuContent = (
    <ul className="fr-menu__list">
      <li>
        <span className="fr-nav__link fr-pt-4v fr-pb-2v">
          {!!user.name && (
            <p className="fr-text--medium fr-text--sm">{user.name}</p>
          )}
          <p className="fr-text--sm fr-text-default--grey">{user.email}</p>
        </span>
      </li>
      <li>
        <Link
          className="fr-nav__link"
          href={`/profils/${user.id}`}
          style={{
            boxShadow: 'none',
            borderBottom: 'var(--slim-grey-border)',
          }}
        >
          <span
            className="fr-icon-user-setting-line fr-icon--sm fr-mr-1w"
            style={{ color: 'var(--blue-france-sun-113-625)' }}
          />
          Voir mon profil
        </Link>
      </li>
      {bases.length > 0 ? (
        <>
          <li>
            <p
              className="fr-text--sm fr-nav__link fr-text-default--grey fr-pb-2v"
              style={{
                boxShadow: 'none',
              }}
            >
              Mes bases
            </p>
          </li>
          {bases.map(({ slug, title }) => (
            <li key={slug}>
              <Link
                className="fr-nav__link"
                href={`/bases/${slug}`}
                style={{
                  boxShadow: 'none',
                  borderBottom: undefined,
                }}
              >
                <span
                  className="fr-icon-home-4-line fr-icon--sm fr-mr-1w"
                  style={{
                    color: 'var(--blue-france-sun-113-625)',
                  }}
                />
                {title}
              </Link>
            </li>
          ))}
        </>
      ) : null}
      <li>
        <Link
          className="fr-nav__link"
          href="/bases/creer"
          style={{
            boxShadow: 'none',
            borderBottom: 'var(--slim-grey-border)',
          }}
        >
          <span
            className="fr-icon-add-line fr-icon--sm fr-mr-1w"
            style={{ color: 'var(--blue-france-sun-113-625)' }}
          />
          Créer une base
        </Link>
      </li>
      <li>
        <Link className="fr-nav__link" href="/deconnexion">
          <span
            className="fr-icon-logout-box-r-line fr-icon--sm fr-mr-1w"
            style={{ color: 'var(--blue-france-sun-113-625)' }}
          />
          Se déconnecter
        </Link>
      </li>
    </ul>
  )

  /**
   * In mobile, the user menu is displayed in the menu modal.
   * In desktop, the user menu is a button + a dropdown.
   */
  return (
    <>
      <button
        className="fr-nav__btn fr-btn fr-btn--sm fr-hidden fr-unhidden-lg"
        type="button"
        aria-expanded="false"
        aria-controls="header-user-menu"
        ref={buttonRef}
      >
        {displayName}
      </button>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        role="navigation"
        className={classNames('fr-collapse', 'fr-menu', styles.collapse)}
        id="header-user-menu"
        ref={collapseRef}
        onClick={onClickOrEnterInsideDropdown}
        onKeyDown={onClickOrEnterInsideDropdown}
      >
        {menuContent}
      </div>
      <div
        role="navigation"
        className={classNames('fr-hidden-lg', 'fr-px-1w', styles.mobile)}
      >
        {menuContent}
      </div>
    </>
  )
}
