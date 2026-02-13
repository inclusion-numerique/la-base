import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { JSX } from 'react'
import { toast } from 'react-hot-toast'
import styles from './Toaster.module.css'

export type ToastPriority = 'info' | 'warning' | 'error' | 'success'

const icons: { [key in ToastPriority]: string } = {
  info: 'fr-icon-info-fill',
  warning: 'fr-icon-warning-fill',
  error: 'fr-icon-error-fill',
  success: 'fr-icon-checkbox-circle-fill',
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
      <div className={classNames('fr-no-print', styles.toastContent)}>
        <span>{message}</span>
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
          onClick={() => toast.dismiss(t.id)}
          aria-label="Fermer la notification"
        >
          <span className="fr-icon-close-line fr-icon--sm" aria-hidden="true" />
        </button>
      </div>
    ),
    {
      duration,
      id,
      className: classNames(styles.toast, styles[priority]),
      icon: <span className={classNames(styles.icon, icons[priority])} />,
    },
  )
}
