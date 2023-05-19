'use client'

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { ContentType } from '@prisma/client'
import styles from './AddContentButton.module.css'

const contents = [
  {
    type: 'Text',
    image: '/images/add-text.svg',
    label: 'Texte',
  },
  {
    type: 'File',
    image: '/images/add-file.svg',
    label: 'Fichier',
    description: 'Taille maximale : 20 Mo. Tout formats acceptés.',
  },
  {
    type: 'Image',
    image: '/images/add-image.svg',
    label: 'Image',
    description: 'Taille maximale : 20 Mo. Formats : jpg, png, pdf..',
  },
  {
    type: 'Link',
    image: '/images/add-link.svg',
    label: 'Lien',
    description: 'Vers un site externe ou une ressource internet à La Base.',
  },
  {
    type: 'SectionTitle',
    image: '/images/add-title.svg',
    label: 'Titre de section',
    description: 'Structurez votre ressource avec des ancres.',
  },
] satisfies {
  type: ContentType
  image: string
  label: string
  description?: string
}[]

const AddContentButton = ({
  onAdd,
  disabled,
}: {
  onAdd: (type: ContentType) => void
  disabled?: boolean
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div ref={ref} className={styles.container}>
      <ButtonsGroup
        buttons={[
          {
            onClick: () => setOpen(!open),
            type: 'button',
            priority: 'secondary',
            iconId: 'fr-icon-add-line',
            children: 'Ajouter un contenu',
            nativeButtonProps: { 'data-testid': 'add-content-button' },
            className: styles.button,
            disabled,
          },
        ]}
      />
      {!disabled && open && (
        <div className={styles.contents}>
          {contents.map((content) => (
            <button
              type="button"
              data-testid={`add-${content.type}-content-button`}
              onClick={() => onAdd(content.type)}
              key={content.type}
              className={styles.content}
            >
              <Image src={content.image} width={24} height={24} alt="" />
              <span className="fr-text--sm fr-mb-0">
                {content.label} {content.description && ' · '}
              </span>
              {content.description && (
                <span className="fr-text--xs fr-mb-0">
                  {content.description}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default AddContentButton
