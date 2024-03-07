import { ReactNode } from 'react'

const KeyFigureTitle = ({
  type,
  children,
}: {
  type: 'publications' | 'views' | 'rates'
  children: ReactNode
}) => (
  <div className="fr-flex fr-align-items-center">
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#F5F5FE" />
      {type === 'publications' && (
        <path
          d="M26.997 14 33 20v12.993A1 1 0 0 1 32.007 34H15.993a.993.993 0 0 1-.993-.992V14.992c0-.537.449-.992 1.002-.992zM26 16h-9v16h14V21h-5zm-6 3h3v2h-3zm0 4h8v2h-8zm0 4h8v2h-8z"
          fill="#000091"
        />
      )}
      {type === 'views' && (
        <path
          d="M24 15c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.82 9-5.391 0-9.877-3.88-10.818-9 .94-5.12 5.427-9 10.819-9m0 16c4.2 0 7.842-2.905 8.777-7a9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 24 31m0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9m0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
          fill="#000091"
        />
      )}{' '}
      {type === 'rates' && (
        <path
          d="M18.455 31 14 34.5V16a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1zm-.692-2H32V17H16v13.385zM19 22h2a3 3 0 1 0 6 0h2a5 5 0 0 1-10 0"
          fill="#000091"
        />
      )}
    </svg>
    <span className="fr-h2 fr-mb-0 fr-ml-2w">{children}</span>
  </div>
)

export default KeyFigureTitle
