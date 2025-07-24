'use client'

import type { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import Button from '@codegouvfr/react-dsfr/Button'
import type { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'
import styles from '../Edition/ResourceEditionActionBar.module.css'
import { InviteContributorDynamicModal } from './InviteContributorModal'

const OpenInviteContributorModalButton = ({
  resource,
  ...buttonProps
}: ButtonProps &
  ButtonProps.AsButton & {
    resource: ResourceListItem
  }) => {
  const open = InviteContributorDynamicModal.useOpen()

  return (
    <Button
      className={styles.collapseButton}
      type="button"
      nativeButtonProps={{
        'data-testid': 'open-invite-contributor-modal-button',
      }}
      onClick={() => open({ resource })}
      {...buttonProps}
    />
  )
}

export default OpenInviteContributorModalButton
