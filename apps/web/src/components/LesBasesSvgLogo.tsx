import { CSSProperties } from 'react'

const LesBasesSvgLogo = ({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) => (
  <svg
    width="64"
    height="66"
    viewBox="0 0 64 66"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M31.9996 66L0.609375 41.748L6.36425 37.4173L31.9996 57.1654L57.635 37.4173L63.3899 41.748L31.9996 66ZM31.9996 48.5039L0.609375 24.252L31.9996 0L63.3899 24.252L31.9996 48.5039ZM31.9996 39.6693L52.0545 24.252L31.9996 8.83465L11.9447 24.252L31.9996 39.6693Z"
      fill="#000091"
    />
  </svg>
)

export default LesBasesSvgLogo
