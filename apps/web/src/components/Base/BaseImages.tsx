import BaseImage from '@app/web/components/BaseImage'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import type { BasePageData } from '@app/web/server/bases/getBase'
import classNames from 'classnames'
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
      <div
        className={classNames(
          styles.banner,
          (base.coverImage || editMode) && styles.imageAspectRatio,
          !base.coverImage && !editMode && 'fr-mt-16v',
        )}
      >
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
        ) : editMode ? (
          <div className={styles.placeholderImage} />
        ) : null}
        {editMode && (
          <>
            <ImageEdition base={base} type="coverImage" />
          </>
        )}
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
