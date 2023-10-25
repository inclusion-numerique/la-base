import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import styles from './EmptyImage.module.css'

const sizes = {
  small: { width: 20, height: 26 },
  medium: { width: 34, height: 44 },
}

const EmptyImage = ({ size }: { size: 'small' | 'medium' }) => (
  <div
    className={classNames(styles.container, {
      [styles.small]: size === 'small',
    })}
  >
    <Image
      src="/images/collection-resource.svg"
      alt="Icone de fichier vide"
      {...sizes[size]}
    />
  </div>
)

export default EmptyImage
