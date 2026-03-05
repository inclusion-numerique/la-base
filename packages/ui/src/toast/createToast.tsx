import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { JSX, useEffect, useId, useRef } from 'react'
import { toast } from 'react-hot-toast'
import styles from './Toaster.module.css'

export type ToastPriority = 'info' | 'warning' | 'error' | 'success'

const icons: { [key in ToastPriority]: string } = {
  info: 'fr-icon-info-fill',
  warning: 'fr-icon-warning-fill',
  error: 'fr-icon-error-fill',
  success: 'fr-icon-checkbox-circle-fill',
}

const priorityLabels: { [key in ToastPriority]: string } = {
  info: 'Information',
  warning: 'Avertissement',
  error: 'Erreur',
  success: 'Succès',
}

const ToastContent = ({
  message,
  action,
  priority,
  onDismiss,
}: {
  message: JSX.Element | string | null
  action?: ButtonProps
  priority: ToastPriority
  onDismiss: () => void
}) => {
  const labelId = useId()
  const descriptionId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<Element | null>(null)

  useEffect(() => {
    previousFocusRef.current = document.activeElement

    const closeButton =
      containerRef.current?.querySelector<HTMLButtonElement>(
        '[data-toast-close]',
      )
    closeButton?.focus()

    return () => {
      if (
        previousFocusRef.current &&
        previousFocusRef.current instanceof HTMLElement
      ) {
        previousFocusRef.current.focus()
      }
    }
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onDismiss()
      return
    }

    if (event.key !== 'Tab') return

    const focusableElements =
      containerRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
    if (!focusableElements || focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else if (document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <div
      ref={containerRef}
      className={classNames('fr-no-print', styles.toastContent)}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      onKeyDown={handleKeyDown}
    >
      <span id={labelId} className="fr-sr-only">
        {priorityLabels[priority]}
      </span>
      <span id={descriptionId}>{message}</span>
      {action && (
        <Button
          className={classNames('fr-ml-1w', styles.action)}
          priority="tertiary no outline"
          size="small"
          {...action}
        />
      )}
      <button
        type="button"
        className={styles.closeButton}
        onClick={onDismiss}
        aria-label="Fermer la notification"
        data-toast-close
      >
        <span className="fr-icon-close-line fr-icon--sm" aria-hidden="true" />
      </button>
    </div>
  )
}

export const createToast = ({
  priority,
  message,
  action,
  duration,
  id,
}: {
  priority: ToastPriority
  message: JSX.Element | string | null
  action?: ButtonProps
  duration?: number
  id?: string
}) => {
  toast(
    (t) => (
      <ToastContent
        message={message}
        action={action}
        priority={priority}
        onDismiss={() => toast.dismiss(t.id)}
      />
    ),
    {
      duration,
      id,
      className: classNames(styles.toast, styles[priority]),
      icon: <span className={classNames(styles.icon, icons[priority])} />,
      ariaProps: {
        role: 'status',
        'aria-live': 'off',
      },
    },
  )
}
