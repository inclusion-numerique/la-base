import React from 'react'
import classNames from 'classnames'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import styles from './Images.module.css'

const collectionImageBreakpoints = [
  { media: '(max-width: 320px)', width: 320 - 32 },
  // Image width is limited to 576 - 32 on non-desktop devices
  // { media: '(max-width: 576px)', width: 576 - 32 },
  { media: '(max-width: 768px)', width: 576 - 32 },
  { media: '(min-width: 768px)', width: 180 },
]

const Images = ({
  className,
  image,
  resources,
}: {
  className?: string
  image?: { id: string; altText?: string | null } | null
  resources: { image: { id: string; altText: string | null } | null }[]
}) => {
  // Display the collection main image if it exists

  if (image) {
    return (
      <div className={classNames(styles.container, className)}>
        <ResponsiveUploadedImage
          id={image.id}
          alt={image.altText ?? ''}
          breakpoints={collectionImageBreakpoints}
        />
      </div>
    )
  }

  // Get resources with images
  const [bigImage, secondImage, thirdImage] = resources
    .map((resource) => resource.image)
    .filter(
      (
        resourceImage,
      ): resourceImage is { id: string; altText: string | null } =>
        !!resourceImage,
    )

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.imageContainer}>
        {bigImage ? (
          <ResponsiveUploadedImage
            id={bigImage.id}
            alt={bigImage.altText ?? ''}
            breakpoints={collectionImageBreakpoints}
          />
        ) : null}
      </div>
      <div className={styles.imageContainer}>
        {secondImage ? (
          <ResponsiveUploadedImage
            id={secondImage.id}
            alt={secondImage.altText ?? ''}
            breakpoints={collectionImageBreakpoints}
          />
        ) : null}
      </div>
      <div className={styles.imageContainer}>
        {thirdImage ? (
          <ResponsiveUploadedImage
            id={thirdImage.id}
            alt={thirdImage.altText ?? ''}
            breakpoints={collectionImageBreakpoints}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Images
