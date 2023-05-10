/* eslint no-use-before-define: 0, react/no-unused-prop-types: 0, react/prop-types: 0, @typescript-eslint/no-use-before-define: 0, @typescript-eslint/naming-convention:0, @typescript-eslint/no-unsafe-call:0, unicorn/prefer-query-selector: 0, default-case: 0, @typescript-eslint/no-explicit-any:0, react/no-array-index-key:0, jsx-a11y/no-redundant-roles:0, @typescript-eslint/no-unsafe-return:0  */
import React, {
  type CSSProperties,
  forwardRef,
  memo,
  type ReactNode,
} from 'react'
import { assert } from 'tsafe/assert'
import { symToStr } from 'tsafe/symToStr'
import type { Equals } from 'tsafe'
import { capitalize } from 'tsafe/capitalize'
import { uncapitalize } from 'tsafe/uncapitalize'
import { typeGuard } from 'tsafe/typeGuard'
import { overwriteReadonlyProp } from 'tsafe/lab/overwriteReadonlyProp'
import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import type {
  FrIconClassName,
  RiIconClassName,
} from '@codegouvfr/react-dsfr/fr/generatedFromCss/classNames'
import { createComponentI18nApi } from '@codegouvfr/react-dsfr/i18n'
import { cx } from '@codegouvfr/react-dsfr/tools/cx'

export type ModalProps = {
  className?: string
  /** Default: "medium" */
  size?: 'small' | 'medium' | 'large'
  title: ReactNode
  children: ReactNode
  /** Default: true */
  concealingBackdrop?: boolean
  topAnchor?: boolean
  iconId?: FrIconClassName | RiIconClassName
  buttons?:
    | [ModalProps.ActionAreaButtonProps, ...ModalProps.ActionAreaButtonProps[]]
    | ModalProps.ActionAreaButtonProps
  style?: CSSProperties
}

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-redeclare
export namespace ModalProps {
  export type ActionAreaButtonProps = ButtonProps & {
    /** Default: true */
    doClosesModal?: boolean
  }

  export type ModalButtonProps = {
    nativeButtonProps: {
      'aria-controls': string
      'data-fr-opened': boolean
    }
  }
}

const Modal = memo(
  forwardRef<HTMLDialogElement, ModalProps & { id: string }>((props, ref) => {
    const {
      className,
      id,
      title,
      children,
      concealingBackdrop = true,
      topAnchor = false,
      iconId,
      buttons: buttons_props,
      size = 'medium',
      style,
      ...rest
    } = props

    assert<Equals<keyof typeof rest, never>>()

    const buttons =
      buttons_props === undefined
        ? undefined
        : Array.isArray(buttons_props)
        ? buttons_props
        : [buttons_props]

    const { t } = useTranslation()
    const titleId = `fr-modal-title-${id}`
    return (
      <dialog
        aria-labelledby={titleId}
        role="dialog"
        id={id}
        className={cx(cx('fr-modal', topAnchor && 'fr-modal--top'), className)}
        style={style}
        ref={ref}
        data-fr-concealing-backdrop={concealingBackdrop}
      >
        <div
          className={cx(
            'fr-container',
            'fr-container--fluid',
            'fr-container-md',
          )}
        >
          <div className={cx('fr-grid-row', 'fr-grid-row--center')}>
            <div
              className={(() => {
                switch (size) {
                  case 'large': {
                    return cx('fr-col-12', 'fr-col-md-10', 'fr-col-lg-8')
                  }
                  case 'small': {
                    return cx('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4')
                  }
                  case 'medium': {
                    return cx('fr-col-12', 'fr-col-md-8', 'fr-col-lg-6')
                  }
                }
              })()}
            >
              <div className={cx('fr-modal__body')}>
                <div className={cx('fr-modal__header')}>
                  <button
                    className={cx('fr-btn--close', 'fr-btn')}
                    title={t('close')}
                    aria-controls={id}
                    type="button"
                  >
                    {t('close')}
                  </button>
                </div>
                <div className={cx('fr-modal__content')}>
                  <h1 id={titleId} className={cx('fr-modal__title')}>
                    {iconId !== undefined && (
                      <span className={cx(iconId, 'fr-fi--lg')} />
                    )}
                    {title}
                  </h1>
                  {children}
                </div>
                {buttons !== undefined && (
                  <div className="fr-modal__footer">
                    <ul
                      className={cx(
                        'fr-btns-group',
                        'fr-btns-group--right',
                        'fr-btns-group--inline-reverse',
                        'fr-btns-group--inline-lg',
                        'fr-btns-group--icon-left',
                      )}
                    >
                      {[...buttons]
                        .reverse()
                        .map(
                          ({ doClosesModal = true, ...buttonProps }, index) => (
                            <li key={index}>
                              <Button
                                {...(buttonProps as any)}
                                priority={
                                  buttonProps.priority ??
                                  (index === 0 ? 'primary' : 'secondary')
                                }
                                {...(doClosesModal
                                  ? 'linkProps' in buttonProps
                                    ? {
                                        linkProps: {
                                          ...buttonProps.linkProps,
                                          'aria-controls': id,
                                        },
                                      }
                                    : {
                                        nativeButtonProps: {
                                          ...buttonProps.nativeButtonProps,
                                          'aria-controls': id,
                                        },
                                      }
                                  : {})}
                              />
                            </li>
                          ),
                        )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    )
  }),
)

Modal.displayName = symToStr({ Modal })

const { useTranslation, addModalTranslations } = createComponentI18nApi({
  componentName: symToStr({ Modal }),
  frMessages: {
    close: 'Fermer',
  },
})

addModalTranslations({
  lang: 'en',
  messages: {
    close: 'Close',
  },
})

addModalTranslations({
  lang: 'es',
  messages: {
    /* spell-checker: disable */
    close: 'Cerrar',
    /* spell-checker: enable */
  },
})

export { addModalTranslations }

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-modal> */
export function createModal<Name extends string>(params: {
  name: Name
  isOpenedByDefault: boolean
}): Record<
  `${Uncapitalize<Name>}ModalNativeButtonProps`,
  {
    'aria-controls': string
    'data-fr-opened': boolean
  }
> &
  Record<`${Capitalize<Name>}Modal`, (props: ModalProps) => JSX.Element> &
  Record<`close${Capitalize<Name>}Modal`, () => void> &
  Record<`open${Capitalize<Name>}Modal`, () => void> &
  Record<`${Uncapitalize<Name>}ModalButtonProps`, ModalProps.ModalButtonProps> {
  const { name, isOpenedByDefault } = params

  const modalId = `${uncapitalize(name)}-modal`

  const modalNativeButtonProps = {
    'aria-controls': modalId,
    'data-fr-opened': isOpenedByDefault,
  }

  const hiddenControlButtonId = `${modalId}-hidden-control-button`

  const InternalModal = (props: ModalProps) => (
    <>
      <Button
        nativeButtonProps={{
          ...modalNativeButtonProps,
          id: hiddenControlButtonId,
          type: 'button',
        }}
        className={cx('fr-hidden')}
      >
        {' '}
      </Button>
      <Modal {...props} id={modalId} />
    </>
  )

  InternalModal.displayName = `${capitalize(name)}Modal`

  overwriteReadonlyProp(InternalModal as any, 'name', InternalModal.displayName)

  function openModal() {
    const hiddenControlButton = document.getElementById(hiddenControlButtonId)

    assert(hiddenControlButton !== null, "Modal isn't mounted")

    hiddenControlButton.click()
  }

  overwriteReadonlyProp(
    openModal as any,
    'name',
    `open${capitalize(name)}Modal`,
  )

  function closeModal() {
    const modalElement = document.getElementById(modalId)

    assert(modalElement !== null, "Modal isn't mounted")

    const closeButtonElement = modalElement.querySelector(
      `.${cx('fr-btn--close')}`,
    )

    assert(closeButtonElement !== null)

    assert(
      typeGuard<HTMLButtonElement>(
        closeButtonElement,
        'click' in closeButtonElement,
      ),
      "Close button isn't a button",
    )

    closeButtonElement.click()
  }

  overwriteReadonlyProp(
    closeModal as any,
    'name',
    `close${capitalize(name)}Modal`,
  )

  return {
    [InternalModal.displayName]: InternalModal,
    [`${uncapitalize(name)}ModalNativeButtonProps`]: modalNativeButtonProps,
    [openModal.name]: openModal,
    [closeModal.name]: closeModal,
    /** @deprecated */
    [`${uncapitalize(name)}ModalButtonProps`]: {
      nativeButtonProps: modalNativeButtonProps,
    },
  } as any
}
