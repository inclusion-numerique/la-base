import RichTextLinkModalForm from '@app/ui/components/Form/RichText/RichTextLinkModalForm'
import {
  EditLinkOptions,
  isSelectionOkForLink,
  linkCommandHandler,
} from '@app/ui/components/Form/RichText/richTextLinkFeature'
import { noop } from '@app/web/utils/noop'
import { Editor } from '@tiptap/react'
import classNames from 'classnames'
import React, { MouseEventHandler, useState } from 'react'
import styles from './RichTextFormMenuBar.module.css'

const MenuButton = ({
  title,
  active,
  disabled,
  onClick,
  icon,
}: {
  title: string
  icon: string
  onClick: MouseEventHandler<HTMLButtonElement>
  active?: boolean
  disabled?: boolean
}) => (
  <button
    data-testid={`${title}-button`}
    title={title}
    aria-label={title}
    className={classNames(
      icon,
      styles.button,
      {
        [styles.active]: active,
        [styles.disabled]: disabled,
      },
      'fr-icon--sm',
    )}
    type="button"
    disabled={disabled}
    onClick={(event) => {
      event.preventDefault()
      onClick(event)
    }}
  />
)

const RichTextFormMenuBar = ({ editor }: { editor: Editor }) => {
  const [editLink, setEditLink] = useState<EditLinkOptions>({
    onSubmit: noop,
  })

  const onLinkClick = linkCommandHandler(editor, setEditLink)

  const linkActive = editor.isActive('link')
  const canEditLink = linkActive || isSelectionOkForLink(editor)

  return (
    <>
      <div className={styles.menuBar}>
        <MenuButton
          title="Titre 1"
          icon="fr-icon-h-1"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }}
          active={editor.isActive('heading', { level: 2 })}
        />
        <MenuButton
          title="Titre 2"
          icon="fr-icon-h-2"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }}
          active={editor.isActive('heading', { level: 3 })}
        />
        <MenuButton
          title="Titre 3"
          icon="fr-icon-h-3"
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }}
          active={editor.isActive('heading', { level: 4 })}
        />
        <div className={styles.separator} />
        <MenuButton
          title="Gras"
          icon="fr-icon-bold"
          onClick={() => {
            editor.chain().focus().toggleBold().run()
          }}
          active={editor.isActive('bold')}
        />
        <MenuButton
          title="Italique"
          icon="fr-icon-italic"
          onClick={() => {
            editor.chain().focus().toggleItalic().run()
          }}
          active={editor.isActive('italic')}
        />
        <div className={styles.separator} />
        <MenuButton
          title="Liste ordonnée"
          icon="fr-icon-list-ordered"
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run()
          }}
          active={editor.isActive('orderedList')}
        />
        <MenuButton
          title="Liste non ordonnée"
          icon="fr-icon-list-unordered"
          onClick={() => {
            editor.chain().focus().toggleBulletList().run()
          }}
          active={editor.isActive('bulletList')}
        />
        <div className={styles.separator} />
        <MenuButton
          title="Lien"
          icon="fr-icon-link"
          onClick={() => {
            onLinkClick()
          }}
          disabled={!canEditLink}
          active={linkActive}
        />
      </div>
      <RichTextLinkModalForm
        onSubmit={editLink.onSubmit}
        url={editLink.url}
        onCancel={editLink.onCancel}
      />
    </>
  )
}

export default RichTextFormMenuBar
