'use client'

import { SessionUser } from '@app/web/auth/sessionUser'
import LeaveBaseModaleNotice from '@app/web/features/base/components/LeaveBaseModaleNotice'
import { BasePageData } from '@app/web/server/bases/getBase'
import type { BaseProfileListItemWithAllFields } from '@app/web/server/bases/getBasesList'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'

export const LeaveBaseButton = ({
  base,
  user,
}: {
  base: BaseProfileListItemWithAllFields | BasePageData
  user: SessionUser | null
}) => {
  const {
    Component: LeaveProfileBaseModal,
    buttonProps: leaveProfileBaseNativeButtonProps,
    close,
  } = createModal({
    id: `leave-profile-base-${base.id}`,
    isOpenedByDefault: false,
  })
  if (!user) {
    return null
  }

  return (
    <div>
      <Button
        priority="tertiary no outline"
        title="Quitter la base"
        data-testid="leave-base-member-button"
        size="small"
        nativeButtonProps={{ ...leaveProfileBaseNativeButtonProps }}
      >
        Quitter
        <span className="ri-logout-box-r-line fr-ml-1w" aria-hidden="true" />
      </Button>
      <form>
        <LeaveProfileBaseModal
          title="Quitter la base"
          className="fr-modal--overflow-visible"
        >
          <div className="fr-flex fr-direction-column fr-flex-gap-4v">
            <div>
              Êtes-vous sûr de vouloir quitter la base&nbsp;
              <span className="fr-text--bold">{base.title}</span>&nbsp;?
            </div>
            <LeaveBaseModaleNotice base={base} user={user} closeModal={close} />
          </div>
        </LeaveProfileBaseModal>
      </form>
    </div>
  )
}
