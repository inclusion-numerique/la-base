'use client'

import { fileUploadHint } from '@app/ui/components/Form/utils/fileValidation.server'
import { imageUploadHint } from '@app/web/server/rpc/image/imageValidation'
import Button from '@codegouvfr/react-dsfr/Button'
import type { ContentType } from '@prisma/client'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { RefObject, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import styles from './AddContentButton.module.css'

const contents = [
  {
    type: 'SectionTitle',
    image: '/images/add-title.svg',
    label: 'Titre de section',
    description: 'Structurez votre ressource avec des ancres.',
  },
  {
    type: 'Text',
    image: '/images/add-text.svg',
    label: 'Texte',
  },
  {
    type: 'File',
    image: '/images/add-file.svg',
    label: 'Fichier',
    description: fileUploadHint,
  },
  {
    type: 'Image',
    image: '/images/add-image.svg',
    label: 'Image',
    description: imageUploadHint(),
  },
  {
    type: 'Link',
    image: '/images/add-link.svg',
    label: 'Lien',
    description: 'Vers un site externe ou une ressource interne Les Bases.',
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
  editing,
  withBorder = false,
  as = 'div',
}: {
  onAdd: (type: ContentType) => void
  disabled?: boolean
  editing: boolean
  withBorder?: boolean
  as?: 'li' | 'div'
}) => {
  const ref = useRef<HTMLDivElement | HTMLLIElement | null>(null)
  const [open, setOpen] = useState(false)

  useOnClickOutside(ref as RefObject<HTMLElement>, () => setOpen(false))

  const Component = as

  return (
    <Component
      ref={
        ref as React.RefObject<HTMLLIElement> & React.RefObject<HTMLDivElement>
      }
      className={styles.container}
    >
      {withBorder ? (
        <div
          className={classNames(styles.borderContainer, open && styles.open)}
        >
          <hr className={styles.defaultBorder} />
          <hr className={styles.border} />
          {!editing && (
            <Button
              onClick={() => setOpen(!open)}
              type="button"
              priority="tertiary no outline"
              iconId="fr-icon-add-line"
              aria-expanded={open}
              nativeButtonProps={{ 'data-testid': 'add-content-button' }}
              className={styles.buttonWithBorder}
              disabled={disabled}
            >
              Ajouter un contenu
            </Button>
          )}
          <hr className={styles.border} />
        </div>
      ) : (
        <Button
          onClick={() => setOpen(!open)}
          type="button"
          priority="secondary"
          iconId="fr-icon-add-line"
          nativeButtonProps={{ 'data-testid': 'add-content-button' }}
          className={classNames(
            'fr-flex fr-width-full fr-justify-content-center',
            styles.button,
          )}
          aria-expanded={open}
          disabled={disabled}
        >
          Ajouter un contenu
        </Button>
      )}
      {!disabled && (
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className={classNames('fr-raw-list', styles.contents)}
            >
              {contents.map((content) => (
                <li
                  className={styles.content}
                  key={content.type}
                  onClick={() => onAdd(content.type)}
                >
                  <button
                    type="button"
                    data-testid={`add-${content.type}-content-button`}
                    className="fr-flex fr-align-items-center"
                  >
                    <Image src={content.image} width={24} height={24} alt="" />
                    <span className="fr-text--sm fr-text--medium fr-mb-0">
                      {content.label}
                    </span>
                    {!!content.description && (
                      <span
                        className={classNames(
                          'fr-text--sm fr-text--medium fr-mb-0 fr-px-1v',
                          styles.dotSeparator,
                        )}
                      >
                        {' · '}
                      </span>
                    )}
                    {!!content.description && (
                      <span className="fr-text--xs fr-mb-0">
                        {content.description}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </Component>
  )
}

export default AddContentButton
