import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { Fragment, RefObject, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import styles from './InviteUserType.module.css'

const InviteUserType = ({
  onChange,
  canAddAdmin,
  selectedMemberType,
}: {
  onChange?: (type: 'admin' | 'member') => void
  canAddAdmin: boolean
  selectedMemberType: 'admin' | 'member'
}) => {
  const [open, setOpen] = useState(false)
  const optionsRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(optionsRef as RefObject<HTMLDivElement>, () =>
    setOpen(false),
  )

  const options = [
    {
      label: 'Contributeur',
      value: 'member',
      dataTestId: 'base-invite-member-role-member',
    },
    ...(canAddAdmin
      ? [
          {
            label: 'Administrateur',
            value: 'admin',
            dataTestId: 'base-invite-member-role-admin',
          },
        ]
      : []),
  ]
  const handleOnChange = (value: string) => {
    onChange?.(value as 'admin' | 'member')
    setOpen(false)
  }
  return (
    <div className={styles.container} ref={optionsRef}>
      {!!onChange && (
        <Button
          className={classNames(
            styles.button,
            'fr-text--semi-bold fr-text-label--blue-france',
          )}
          priority="tertiary"
          iconId={`fr-icon-arrow-${open ? 'up' : 'down'}-s-line`}
          iconPosition="right"
          onClick={() => setOpen(!open)}
          type="button"
          size="small"
          data-testid="base-invite-member-role-select"
        >
          {selectedMemberType === 'admin' ? 'Administrateur' : 'Contributeur'}
        </Button>
      )}
      {open && (
        <div className={styles.options}>
          {options.map((option) => (
            <Fragment key={option.value}>
              <button
                type="button"
                className={styles.option}
                onClick={() => handleOnChange(option.value)}
                data-testid={option.dataTestId}
              >
                <div>{option.label}</div>
              </button>
              <hr className={styles.separator} />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default InviteUserType
