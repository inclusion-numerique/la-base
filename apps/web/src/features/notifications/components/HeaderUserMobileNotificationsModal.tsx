'use client'

import type { SessionUser } from '@app/web/auth/sessionUser'
import HeaderUserNotificationsMenu from './HeaderUserNotificationsMenu'

const HeaderUserMobileNotificationsModal = ({
  user,
}: {
  user: SessionUser
}) => (
  <div
    className="fr-header__menu fr-modal"
    id="notifications-modal"
    aria-labelledby="notifications-modal-button"
  >
    <div className="fr-container">
      <button
        type="button"
        className="fr-btn--close fr-btn"
        aria-controls="notifications-modal"
        title="Fermer"
      >
        Fermer
      </button>
      <div className="fr-header__menu-links">
        <HeaderUserNotificationsMenu user={user} />
      </div>
    </div>
  </div>
)

export default HeaderUserMobileNotificationsModal
