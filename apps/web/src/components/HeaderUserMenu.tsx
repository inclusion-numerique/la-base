'use client'

import classNames from 'classnames'
import Link from 'next/link'
import React, {
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useRef,
} from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { SessionUser } from '@app/web/auth/sessionUser'
import { getUserDisplayName } from '@app/web/utils/user'
import { getBasesFromSessionUser } from '@app/web/bases/getBasesFromSessionUser'
import OpenOnboardingForMigratedUserThatHasNotSeenIt from '@app/web/app/nouveautes/OpenOnboardingForMigratedUserThatHasNotSeenIt'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import styles from './HeaderUserMenu.module.css'

const hasKey = (
  event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
): event is React.KeyboardEvent<HTMLDivElement> =>
  Object.prototype.hasOwnProperty.call(event, 'key')

export const HeaderUserMenu = ({ user }: { user: SessionUser }) => {
  const bases = getBasesFromSessionUser(user)

  // The click outside default behavior from dsfr js do not work in this case 🤷‍
  // So we have to use client component and hooks to handle the click outside
  const buttonRef = useRef<HTMLButtonElement>(null)
  const collapseRef = useRef<HTMLDivElement>(null)
  const displayName = getUserDisplayName(user)
  const onClickOrEnterInsideDropdown = (
    event: KeyboardEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement>,
  ) => {
    if (hasKey(event) && (event.key === 'Tab' || event.key === 'Shift')) return

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
        <Link
          className="fr-nav__link fr-flex fr-align-items-center"
          href={`/profils/${user.slug}`}
          style={{
            boxShadow: 'none',
            borderBottom: 'var(--slim-grey-border)',
          }}
        >
          <RoundProfileImage className="fr-mr-3v" user={user} />
          <span>
            {user.name ? (
              <>
                <p className="fr-text--bold fr-text--md fr-mb-0 fr-text-default--grey">
                  {user.name}
                </p>
                <p className="fr-text--sm fr-text-mention--grey fr-mb-0">
                  {user.email}
                </p>
              </>
            ) : (
              <p className="fr-text--bold fr-text--md fr-mb-0">{user.email}</p>
            )}
            <span className="fr-text-title--blue-france fr-text--sm fr-mb-0">
              Voir mon profil
            </span>
          </span>
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
        className={classNames(
          'fr-collapse',
          'fr-menu',
          'fr-mt-1w',
          styles.collapse,
        )}
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
      {!user.hasSeenV2Onboarding && !!user.legacyId && (
        <OpenOnboardingForMigratedUserThatHasNotSeenIt user={user} />
      )}
    </>
  )
}
