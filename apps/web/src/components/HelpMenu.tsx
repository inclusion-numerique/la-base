'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import Link from 'next/link'
import React, {
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useRef,
} from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { feedbackModalId } from './Feedback/feedbackModalProps'
import styles from './HeaderUserMenu.module.css'

const hasKey = (
  event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
): event is React.KeyboardEvent<HTMLDivElement> =>
  Object.prototype.hasOwnProperty.call(event, 'key')

export const HelpMenu = () => {
  // The click outside default behavior from dsfr js do not work in this case 🤷‍
  // So we have to use client component and hooks to handle the click outside
  const buttonRef = useRef<HTMLButtonElement>(null)
  const collapseRef = useRef<HTMLDivElement>(null)
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
          className="fr-nav__link"
          href="/centre-d-aide"
          style={{
            boxShadow: 'none',
            borderBottom: 'var(--slim-grey-border)',
          }}
        >
          <span
            className="ri-question-line fr-mr-1w"
            style={{ color: 'var(--blue-france-sun-113-625)' }}
          />
          Centre d’aide
        </Link>
      </li>
      <li>
        <Button
          className="fr-mx-0"
          style={{ width: '100%' }}
          key="feedback"
          type="button"
          priority="tertiary no outline"
          iconId="fr-icon-feedback-line"
          aria-controls={feedbackModalId}
          data-fr-opened={false}
          id="header-feedback-control-button"
        >
          <span className="fr-text-default--grey fr-text--regular fr-py-1v">
            Je donne mon avis
          </span>
        </Button>
      </li>
    </ul>
  )

  /**
   * In mobile, the help menu is displayed in the menu modal.
   * In desktop, the help menu is a button + a dropdown.
   */
  return (
    <>
      <button
        className="fr-nav__btn fr-btn fr-btn--sm fr-hidden fr-unhidden-lg"
        type="button"
        aria-expanded="false"
        aria-controls="header-help-menu"
        ref={buttonRef}
      >
        <span
          role="img"
          className="ri-question-line ri-lg fr-py-1v"
          aria-hidden={false}
        />
        <span className="fr-sr-only">Aide</span>
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
        id="header-help-menu"
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
