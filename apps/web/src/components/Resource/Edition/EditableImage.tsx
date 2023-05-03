import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import styles from './EditableImage.module.css'

const EditableImage = () => (
  <div className={styles.container}>
    <Image
      src="/images/image-placeholder.svg"
      alt="Image vide"
      width={40}
      height={40}
    />
    <div>
      <div className="fr-text--sm fr-mb-0">
        Ajouter une image de présentation pour attirer les visiteurs
      </div>
      <div className={classNames('fr-text--sm', 'fr-mb-0', styles.grey)}>
        Taille maximale : xx Mo. Formats supportés : jpg, png, pdf.
      </div>
      <input type="file" className="fr-mt-2w" />
    </div>
  </div>
)

export default EditableImage
