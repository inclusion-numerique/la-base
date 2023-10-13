import React from 'react'
import { FilteredBase } from '@app/web/server/bases/authorization'
import { BasePageData } from '@app/web/server/bases/getBase'
import RoundImage from '../RoundImage'
import UploadedImage from '../UploadedImage'
import styles from './Images.module.css'

const Images = ({ base }: { base: BasePageData | FilteredBase }) => (
  <>
    {base.coverImage ? (
      <UploadedImage
        className={styles.banner}
        src={base.coverImage.id}
        alt="Image de couverture de la base"
        width={1200}
        height={250}
      />
    ) : (
      <div className={styles.banner} />
    )}
    <RoundImage
      className={styles.logo}
      size={128}
      image={base.image}
      borderWidth={2}
    />
  </>
)

export default Images
