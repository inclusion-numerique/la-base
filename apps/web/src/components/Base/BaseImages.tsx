import React from 'react'
import { BasePageData } from '@app/web/server/bases/getBase'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import BaseImage from '@app/web/components/BaseImage'
import styles from './BaseImages.module.css'
import ImageEdition from './Edition/BaseImageEdition'

const BaseImages = (
  props:
    | {
        base: BasePageData
        editMode: true
      }
    | {
        base: BasePageData
        editMode?: false
      },
) => {
  const { base, editMode } = props

  return (
    <>
      <div className={styles.banner}>
        {base.coverImage ? (
          <ResponsiveUploadedImage
            id={base.coverImage.id}
            alt={base.coverImage.altText ?? ''}
            breakpoints={[
              { media: '(min-width: 768px)', width: 1200 },
              { media: '(min-width: 576px)', width: 800 - 32 },
              { media: '(max-width: 576px)', width: 1200 },
            ]}
          />
        ) : null}
        {editMode && <ImageEdition base={base} type="coverImage" />}
      </div>
      <div className={styles.logoContainer}>
        <BaseImage
          className={styles.logo}
          size={128}
          base={base}
          borderWidth={2}
        />
        {editMode && <ImageEdition base={base} type="image" />}
      </div>
    </>
  )
}

export default BaseImages
