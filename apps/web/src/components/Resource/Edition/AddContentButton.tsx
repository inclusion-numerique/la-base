'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import styles from './AddContentButton.module.css'

const contents = [
  {
    key: 'text',
    image: '/images/add-text.svg',
    label: 'Texte',
  },
  {
    key: 'file',
    image: '/images/add-file.svg',
    label: 'Fichier',
    description: 'Taille maximale : 20 Mo. Tout formats acceptés.',
  },
  {
    key: 'image',
    image: '/images/add-image.svg',
    label: 'Image',
    description: 'Taille maximale : 20 Mo. Formats : jpg, png, pdf..',
  },
  {
    key: 'link',
    image: '/images/add-link.svg',
    label: 'Lien',
    description: 'Vers un site externe ou une ressource internet à La Base.',
  },
  {
    key: 'title',
    image: '/images/add-title.svg',
    label: 'Titre de section',
    description: 'Structurez votre ressource avec des ancres.',
  },
]

const AddContentButton = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [setOpen])

  return (
    <div ref={ref} className={styles.container}>
      <ButtonsGroup
        buttons={[
          {
            onClick: () => setOpen(!open),
            priority: 'secondary',
            iconId: 'fr-icon-add-line',
            children: 'Ajouter un contenu',
            className: styles.button,
          },
        ]}
      />
      {open && (
        <div className={styles.contents}>
          {contents.map((content) => (
            <div key={content.key} className={styles.content}>
              <Image src={content.image} width={24} height={24} alt="" />
              <div>
                <span className="fr-text--sm fr-mb-0">
                  {content.label} {content.description && ' · '}
                </span>
                {content.description && (
                  <span className="fr-text--xs fr-mb-0">
                    {content.description}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AddContentButton
