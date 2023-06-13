import classNames from 'classnames'
import React from 'react'
import Link from 'next/link'
import { ResourceContent } from '@app/web/server/resources/getResource'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import styles from './ImageView.module.css'

const ImageView = ({
  content: { title, image, caption },
}: {
  content: Pick<ResourceContent, 'title' | 'caption'> & {
    image: Exclude<ResourceContent['image'], null>
  }
}) => {
  const imageRatio =
    image.width && image.height ? image.width / image.height : undefined
  return (
    <div data-testid="content-image">
      <h6 data-testid="content-image-title" className="fr-mb-0">
        {title}
      </h6>
      <div
        className={styles.imageContainer}
        style={{ aspectRatio: imageRatio }}
      >
        <ResponsiveUploadedImage
          id={image.id}
          alt={image.altText ?? ''}
          breakpoints={[
            { media: '(max-width: 320px)', width: 320 - 32 },
            { media: '(max-width: 576px)', width: 576 - 32 },
            { media: '(max-width: 768px)', width: 768 - 32 },
            { media: '(min-width: 768px)', width: 588 },
          ]}
        />
      </div>
      <div className={styles.imageFileContainer}>
        <span
          className={classNames(
            'fr-icon-image-line fr-icon--sm fr-mr-1w',
            styles.icon,
          )}
        />
        <span
          className={classNames('fr-hint-text fr-mr-1w fr-mb-0', styles.name)}
        >
          {image.upload.name}
        </span>
        <span style={{ flexGrow: 1 }} />
        {/* <DownloadFileButton */}
        {/*  fileKey={image.upload.key} */}
        {/*  filename={image.upload.name} */}
        {/*  size="small" */}
        {/*  type="button" */}
        {/*  iconId="fr-icon-download-line" */}
        {/*  priority="tertiary no outline" */}
        {/*  title="Télécharger l'image" */}
        {/*  className="fr-mr-1w" */}
        {/* /> */}
        <Link
          title="Voir l'image en plein écran"
          target="_blank"
          href={`/images/${image.id}.original`}
          className={classNames(
            'fr-btn--tertiary-no-outline',
            'fr-btn--sm',
            'fr-icon-file-pdf-line',
            styles.fullScreenLink,
          )}
        >
          <picture>
            <img src="/images/open-in-full.svg" alt="" />
          </picture>
        </Link>
      </div>
      {!!caption && <p className="fr-mb-0 fr-mt-4v fr-text--sm">{caption}</p>}
    </div>
  )
}

export default ImageView
