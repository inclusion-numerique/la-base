import React from 'react'
import classNames from 'classnames'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import styles from './Images.module.css'

const collectionImageBreakpoints = [
  { media: '(min-width: 768px)', width: 395 },
  { media: '(min-width: 448px)', width: 576 - 32 },
  { media: '(min-width: 320px)', width: 395 },
  { media: '(max-width: 320px)', width: 325 },
]

export const HeartIconSvg = ({ width = 68, height = 62 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 68 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34.0027 5.0966C41.8327 -1.9334 53.9327 -1.70007 61.476 5.8566C69.016 13.4166 69.276 25.4566 62.2627 33.3099L33.996 61.6166L5.73604 33.3099C-1.2773 25.4566 -1.01396 13.3966 6.5227 5.8566C14.0727 -1.69007 26.1494 -1.9434 34.0027 5.0966Z"
      fill="#FA7659"
    />
  </svg>
)

const Images = ({
  className,
  image,
  isFavoriteCollection = false,
  resources,
}: {
  className?: string
  image?: { id: string; altText?: string | null } | null
  resources: { image: { id: string; altText: string | null } | null }[]
  isFavoriteCollection?: boolean
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
  const cn = isFavoriteCollection
    ? classNames(styles.container, className, styles.favoriteContainer)
    : classNames(styles.container, className)

  return (
    <div className={cn}>
      {isFavoriteCollection && (
        <div className="fr-flex fr-justify-content-center fr-align-items-center fr-width-full">
          <HeartIconSvg />
        </div>
      )}
      {!isFavoriteCollection && (
        <>
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
        </>
      )}
    </div>
  )
}

export default Images
