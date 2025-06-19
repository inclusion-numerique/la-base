import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import type { ContentProjectionWithContextImage } from '@app/web/server/resources/getResourceFromEvents'
import { getDownloadUrl } from '@app/web/utils/getDownloadUrl'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import styles from './ImageContentDetails.module.css'

const ImageContentDetails = ({
  imageAltText,
  image: {
    id,
    altText,
    width,
    height,
    upload: { name, key },
  },
  className,
  infoContainerClassName,
  imageContainerClassName,
}: {
  image: Pick<
    ContentProjectionWithContextImage,
    'id' | 'width' | 'height' | 'altText'
  > & {
    upload: Pick<ContentProjectionWithContextImage['upload'], 'key' | 'name'>
  }
  // Overriden alt text coming from content
  imageAltText: string | null
  className?: string
  imageContainerClassName?: string
  infoContainerClassName?: string
}) => {
  const imageRatio = width && height ? width / height : undefined

  return (
    <div className={classNames(styles.container, className)}>
      <div
        className={classNames(styles.imageContainer, imageContainerClassName)}
        style={{ aspectRatio: imageRatio }}
      >
        <ResponsiveUploadedImage
          id={id}
          alt={imageAltText ?? altText ?? ''}
          breakpoints={[
            { media: '(min-width: 768px)', width: 620 - 32 },
            { media: '(min-width: 620px)', width: 800 - 32 },
            { media: '(min-width: 576px)', width: 620 - 32 },
            { media: '(min-width: 320px)', width: 576 - 32 },
            { media: '(max-width: 320px)', width: 320 - 32 },
          ]}
        />
      </div>
      <div className={classNames(styles.infoContainer, infoContainerClassName)}>
        <div className={styles.nameAndSize}>
          <span
            className={classNames(
              'fr-icon-image-line fr-icon--sm fr-mr-1w',
              styles.icon,
            )}
          />
          <span
            className={classNames('fr-hint-text fr-mr-1w fr-mb-0', styles.name)}
          >
            {name}
          </span>
        </div>
        <div className={styles.actions}>
          {/* Using <a/> element to disable prefetch on images */}
          {/* We have to double the elements because of responsive styles constraints for mobile (icon) and desktop (label) */}
          <a
            className={classNames(
              'fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-icon-download-line',
            )}
            href={getDownloadUrl(key, { download: true })}
            title="Télécharger l'image'"
          >
            Télécharger
          </a>
          <Link
            title="Voir l'image en plein écran"
            target="_blank"
            href={getDownloadUrl(key)}
            className={classNames(
              'fr-btn--tertiary-no-outline',
              'fr-btn--sm',
              'fr-ml-1w',
              'fr-icon-file-pdf-line',
              styles.fullScreenLink,
            )}
          >
            <picture>
              <img src="/images/open-in-full.svg" alt="" />
            </picture>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ImageContentDetails
