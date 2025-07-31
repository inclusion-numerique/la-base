import UploadedImage from '@app/web/components/UploadedImage'
import classNames from 'classnames'
import { type ComponentProps, type ReactNode } from 'react'
import styles from './RoundImage.module.css'

const RoundImage = ({
  image,
  size = 32,
  radius = 'full',
  borderWidth,
  className,
  fallback,
}: {
  image: { id: string; altText?: string | null } | null
  size?: 24 | 32 | 48 | 96 | 116 | 128
  radius?: 'full' | 'half' | 'quarter'
  borderWidth?: 1 | 2
  className?: string
  fallback?: ReactNode
}) => (
  <div
    className={classNames(
      styles.container,
      size === 24 && styles.size24,
      size === 32 && styles.size32,
      size === 48 && styles.size48,
      size === 96 && styles.size96,
      size === 116 && styles.size116,
      size === 128 && styles.size128,
      borderWidth === 1 && styles.borderWidth1,
      borderWidth === 2 && styles.borderWidth2,
      radius === 'full' && styles.radiusFull,
      radius === 'half' && styles.radiusHalf,
      radius === 'quarter' && styles.radiusQuarter,
      className,
    )}
  >
    {!!image && (
      <UploadedImage
        src={image.id}
        alt={image.altText ?? ''}
        width={size - (borderWidth ?? 0)}
        height={size - (borderWidth ?? 0)}
      />
    )}
    {!image && !!fallback && fallback}
  </div>
)

export type RoundImageProps = ComponentProps<typeof RoundImage>

export default RoundImage
