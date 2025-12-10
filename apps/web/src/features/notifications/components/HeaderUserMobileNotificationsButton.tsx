'use client'

import HeaderUserNotificationsBadge from './HeaderUserNotificationsBadge'

const HeaderUserMobileNotificationsButton = () => (
  <li className="fr-px-md-0 fr-px-2w fr-hidden-sm">
    <div className="fr-position-relative">
      <button
        type="button"
        className="fr-btn"
        data-fr-opened="false"
        aria-controls="notifications-modal"
        aria-haspopup="menu"
        id="notifications-modal-button"
        title="Notifications"
      >
        <span
          className="ri-notification-3-line fr-mr-1w fr-text-label--blue-france"
          aria-hidden
        />
        <span className="fr-position-relative">
          Notifications
          <HeaderUserNotificationsBadge className="fr-position-absolute" />
        </span>
      </button>
    </div>
  </li>
)

export default HeaderUserMobileNotificationsButton
