import { ReactNode } from 'react'

const KeyFigureTitle = ({
  type,
  children,
}: {
  type: 'publications' | 'views' | 'rates' | 'users'
  children: ReactNode
}) => (
  <div className="fr-flex fr-align-items-center">
    <div
      className="fr-background-alt--blue-cumulus"
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {type === 'publications' && (
        <span
          className="fr-icon-file-text-line fr-icon--md"
          style={{
            color: '#000091',
          }}
          aria-hidden="true"
        />
      )}
      {type === 'views' && (
        <span
          className="fr-icon-eye-line fr-icon--md"
          style={{
            color: '#000091',
          }}
          aria-hidden="true"
        />
      )}
      {type === 'rates' && (
        <span
          className="fr-icon-chat-check-line fr-icon--md"
          style={{
            color: '#000091',
          }}
          aria-hidden="true"
        />
      )}
      {type === 'users' && (
        <span
          className="fr-icon-user-star-line fr-icon--md"
          style={{
            color: '#000091',
          }}
          aria-hidden="true"
        />
      )}
    </div>
    <span className="fr-h2 fr-mb-0 fr-ml-2w">{children}</span>
  </div>
)

export default KeyFigureTitle
