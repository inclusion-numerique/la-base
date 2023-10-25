import React from 'react'
import Image from 'next/image'
import styles from './Images.module.css'
import EmptyImage from './EmptyImage'

const Images = ({
  image,
  resources,
}: {
  image?: { id: string; altText?: string | null } | null
  resources?: { image: { id: string; altText: string | null } | null }[]
}) =>
  image ? (
    <Image
      src={`/images/${image.id}.webp`}
      alt={image.altText || ''}
      height={191}
      width={382}
    />
  ) : (
    <div className={styles.container}>
      <div className={styles.images}>
        {resources && resources[0] && resources[0].image ? (
          <Image
            src={`/images/${resources[0].image.id}.webp`}
            alt={resources[0].image.altText || ''}
            height={191}
            width={191}
          />
        ) : (
          <EmptyImage size="medium" />
        )}
      </div>
      <div className={styles.images}>
        {resources && resources[1] && resources[1].image ? (
          <Image
            src={`/images/${resources[1].image.id}.webp`}
            alt={resources[1].image.altText || ''}
            height={95.5}
            width={191}
          />
        ) : (
          <EmptyImage size="small" />
        )}

        {resources && resources[2] && resources[2].image ? (
          <Image
            src={`/images/${resources[2].image.id}.webp`}
            alt={resources[2].image.altText || ''}
            height={95.5}
            width={191}
          />
        ) : (
          <EmptyImage size="small" />
        )}
      </div>
    </div>
  )

export default Images
