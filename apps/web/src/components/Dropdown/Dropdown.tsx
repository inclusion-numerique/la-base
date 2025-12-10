'use client'

import Button, { type ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import React, {
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
} from 'react'
import { useOnClickOutside } from 'usehooks-ts'

const hasKey = (
  event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
): event is React.KeyboardEvent<HTMLDivElement> => Object.hasOwn(event, 'key')

export const Dropdown = ({
  id,
  control,
  children,
  alignRight = false,
  title,
  priority,
  modalPriority,
  modalControlClassName,
  dropdownControlClassName,
  size,
  displayDropdownArrow = true,
  'data-testid': dataTestId,
  onClickOutside,
}: {
  id: string
  control: ReactNode
  children: ReactNode
  alignRight?: boolean
  title?: string
  priority?: ButtonProps['priority']
  modalPriority?: ButtonProps['priority']
  modalControlClassName?: string
  dropdownControlClassName?: string
  size?: ButtonProps['size']
  displayDropdownArrow?: boolean
  'data-testid'?: string
  onClickOutside?: () => void
}) => {
  const formattedId = id.replace('-', '_')
  const [isOpen, setIsOpen] = React.useState(false)

  const modal = createModal({
    id: formattedId,
    isOpenedByDefault: false,
  })

  const buttonRef = useRef<HTMLButtonElement>(null)
  const collapseRef = useRef<HTMLDivElement>(null)

  const handleButtonClick = React.useCallback(() => {
    setIsOpen((previous) => !previous)
  }, [])

  const onClickOrEnterInsideDropdown = (
    event: KeyboardEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement>,
  ) => {
    if (hasKey(event) && (event.key === 'Tab' || event.key === 'Shift')) return

    if (hasKey(event) && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()

      const target = event.target as HTMLElement
      if (
        target instanceof HTMLAnchorElement ||
        target instanceof HTMLButtonElement ||
        target.getAttribute('role') === 'button' ||
        target.closest('a, button, [role="button"]')
      ) {
        const clickableElement =
          target.closest('a, button, [role="button"]') || target
        ;(clickableElement as HTMLElement).click()
        setIsOpen(false)
      }
    }

    if (!hasKey(event) && event.target instanceof HTMLAnchorElement) {
      setIsOpen(false)
    }
  }

  useOnClickOutside(collapseRef as RefObject<HTMLElement>, (event) => {
    if (
      event.target instanceof HTMLElement &&
      buttonRef.current?.contains(event.target)
    ) {
      return
    }

    setIsOpen(false)
    if (onClickOutside) {
      onClickOutside()
    }
  })

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setAttribute('aria-expanded', `${isOpen}`)
    }
  }, [isOpen])

  return (
    <>
      <div className="fr-hidden-md">
        <Button
          className={classNames(
            displayDropdownArrow ? 'fr-dropdown__btn' : '',
            modalControlClassName,
          )}
          priority={modalPriority || priority}
          title={title}
          type="button"
          size={size}
          data-testid={dataTestId}
          {...modal.buttonProps}
        >
          {control}
        </Button>
        <modal.Component title={title}>
          <div
            role="navigation"
            className="fr-dropdown__modal"
            style={{ [alignRight ? 'right' : 'left']: 0 }}
            id={formattedId}
          >
            {children}
          </div>
        </modal.Component>
      </div>
      <div className="fr-dropdown fr-hidden fr-unhidden-md">
        <Button
          className={classNames(
            displayDropdownArrow ? 'fr-dropdown__btn' : '',
            dropdownControlClassName,
          )}
          priority={priority}
          title={title}
          type="button"
          size={size}
          aria-expanded={isOpen}
          aria-controls={formattedId}
          ref={buttonRef}
          data-testid={dataTestId}
          onClick={handleButtonClick}
        >
          {control}
        </Button>
        {isOpen && (
          <div
            role="navigation"
            className="fr-collapse fr-dropdown__pane fr-mr-1v"
            style={{ [alignRight ? 'right' : 'left']: 0 }}
            id={formattedId}
            ref={collapseRef}
            onClick={onClickOrEnterInsideDropdown}
            onKeyDown={onClickOrEnterInsideDropdown}
          >
            {children}
          </div>
        )}
      </div>
    </>
  )
}
