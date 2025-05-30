import Button from '@codegouvfr/react-dsfr/Button'
import type { ModalProps } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import React, { ReactNode } from 'react'

/**
 * This component is used for handling a Modal out of react-dsfr
 * The react-dsfr Modal has issues with re-renders and bugs with visibility.
 * This is our own bare-bone implementation of dsfr modal for more control.
 */
const RawModal = ({
  id,
  title,
  children,
  closeTitle = 'Fermer',
  className,
  concealingBackdrop = true,
  iconId,
  buttons,
  topAnchor,
  style,
  size = 'medium',
}: {
  id: string
  title: ReactNode
  closeTitle?: string
  children?: ReactNode
  className?: string
} & ModalProps) => {
  const titleId = `${id}_title`

  // Control button is required for dsfr.js library to work with the modal as a Disclose instance
  const controlButtonId = `${id}_control_button`

  return (
    <>
      <button
        id={controlButtonId}
        className="fr-hidden"
        type="button"
        data-fr-opened="false"
        aria-controls={id}
        tabIndex={-1}
        aria-hidden
      />
      <dialog
        role="dialog"
        aria-labelledby={titleId}
        id={id}
        className={classNames(
          'fr-modal',
          topAnchor && 'fr-modal--top',
          className,
        )}
        style={style}
        data-fr-concealing-backdrop={concealingBackdrop}
        aria-modal="true"
      >
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div
              className={classNames({
                'fr-col-12 fr-col-md-10 fr-col-lg-8': size === 'large',
                'fr-col-12 fr-col-md-6 fr-col-lg-4': size === 'small',
                'fr-col-12 fr-col-md-8 fr-col-lg-6': size === 'medium',
              })}
            >
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button
                    className="fr-btn--close fr-btn"
                    title={closeTitle}
                    aria-controls={id}
                    type="button"
                    data-fr-js-modal-button="true"
                  >
                    Fermer
                  </button>
                </div>
                <div className="fr-modal__content">
                  <h1 id={titleId} className="fr-modal__title">
                    {!!iconId && (
                      <span className={classNames(iconId, 'fr-fi--lg')} />
                    )}
                    {title}
                  </h1>
                  {children}
                </div>
                {buttons !== undefined && (
                  <div className="fr-modal__footer">
                    <ul
                      className={classNames(
                        'fr-btns-group',
                        'fr-btns-group--right',
                        'fr-btns-group--inline-reverse',
                        'fr-btns-group--inline-lg',
                        'fr-btns-group--icon-left',
                      )}
                    >
                      {(Array.isArray(buttons) ? buttons : [buttons])
                        .reverse()
                        .map(
                          ({ doClosesModal = true, ...buttonProps }, index) => {
                            // There is a bug with safari where tabindex has to be explicitely defined for
                            // the buttons to be focusable

                            if (
                              'linkProps' in buttonProps &&
                              buttonProps.linkProps
                            ) {
                              buttonProps.linkProps = {
                                tabIndex: 0,
                                ...(doClosesModal
                                  ? {
                                      'aria-controls': id,
                                    }
                                  : null),
                                ...buttonProps.linkProps,
                              }
                            } else {
                              buttonProps.nativeButtonProps = {
                                tabIndex: 0,
                                ...(doClosesModal
                                  ? {
                                      'aria-controls': id,
                                    }
                                  : null),
                                ...buttonProps.nativeButtonProps,
                              }
                            }
                            const {
                              iconId: _buttonIconId,
                              iconPosition: _buttonIconPosition,
                              ...props
                            } = buttonProps

                            return (
                              <li
                                key={
                                  buttonProps.nativeButtonProps?.key ??
                                  buttonProps.linkProps?.key ??
                                  index
                                }
                              >
                                <Button
                                  {...props}
                                  priority={
                                    buttonProps.priority ??
                                    (index === 0 ? 'primary' : 'secondary')
                                  }
                                >
                                  {!!_buttonIconId && (
                                    <span
                                      className={classNames(
                                        _buttonIconId,
                                        'fr-mr-1v',
                                      )}
                                    />
                                  )}
                                  {buttonProps.children}
                                </Button>
                              </li>
                            )
                          },
                        )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default RawModal
