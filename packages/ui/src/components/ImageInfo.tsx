import classNames from 'classnames'
import React from 'react'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import styles from './ImageInfo.module.css'

const ImageInfo = ({
  name,
  size,
  className,
}: {
  className?: string
  name: string
  size: number | null
}) => (
  <div className={classNames(styles.container, className)}>
    <span
      className={classNames(styles.icon, 'fr-icon-image-line', 'fr-icon--sm')}
    />
    <div className={styles.imageName} title={name}>
      {name}
    </div>
    ·
    <div className={styles.imageSize}>{size ? formatByteSize(size) : null}</div>
  </div>
)
export default ImageInfo
