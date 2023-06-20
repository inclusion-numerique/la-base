import classNames from 'classnames'
import React, { MouseEventHandler, useState } from 'react'
import { Editor } from '@tiptap/react'
import RichInputLinkModalForm, {
  RichInputLink,
  RichInputLinkModal,
} from '@app/ui/components/Form/RichInputLinkModalForm'
import styles from './RichInputFormMenuBar.module.css'

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

type EditLinkOptions = {
  text?: string
  url?: string
  onSubmit: (data: RichInputLink) => void
  onCancel?: () => void
}

const getSelectedText = ({ selection, doc }: Editor['view']['state']) => {
  const textParts: string[] = []
  if (selection.from === selection.to) {
    return
  }
  doc.nodesBetween(selection.from, selection.to, (node, position) => {
    // we only processing text, must be a selection
    if (!node.isTextblock) {
      return
    }
    // calculate the section to replace
    // const startPosition = Math.max(position + 1, selection.from)
    // const endPosition = Math.min(position + node.nodeSize, selection.to)

    // grab the content
    const substringFrom = Math.max(0, selection.from - position - 1)
    const substringTo = Math.max(0, selection.to - position - 1)
    const textPart = node.textContent.substring(substringFrom, substringTo)
    textParts.push(textPart)

    console.log('NODE AND PART', position, node.textContent, textPart)
  })

  return textParts.join(' ')
}

const linkCommandHandler =
  (editor: Editor, setEditLink: (options: EditLinkOptions) => void) => () => {
    const command = editor.chain().focus()
    const { selection } = editor.state
    const currentUrl = editor.getAttributes('link').href as string | undefined

    const removeLink = () => command.unsetLink()
    const setLinkUrl = (url: string) =>
      command.extendMarkRange('link').setLink({
        href: url,
      })

    if (currentUrl) {
      // We are editing an existing link
      // The text is the content of the link element
      // The url is the already existing one
      const currentText = selection.$head.parent.textContent

      setEditLink({
        url: currentUrl,
        text: currentText,
        onSubmit: (data) => {
          // On save we update the link and the text content of the link element

          RichInputLinkModal.close()
          // We update text content
          command.setContent(data.text)

          if (data.url) {
            setLinkUrl(data.url)
          } else {
            removeLink()
          }

          command.run()
        },
        onCancel: () => {
          removeLink()
          command.run()
        },
      })
      RichInputLinkModal.open()

      return
    }

    // On link creation, current text is from selection
    const currentText = getSelectedText(editor.state)

    // No link yet
    setEditLink({
      text: currentText,
      url: undefined,
      onSubmit: (data) => {
        console.log('MODAL SUBMIT ADD', data)
        RichInputLinkModal.close()

        if (data.url) {
          setLinkUrl(data.url)
        }

        // We replace the selected content with the form text
        // This will flatten nodes (this is what we want) e.g. for bold stuff
        command.insertContentAt(
          {
            from: selection.from,
            to: selection.to,
          },
          data.text,
        )

        command.run()
      },
    })
    RichInputLinkModal.open()
  }

// Cannot link multiple element of a list
const isSelectionOkForLink = (editor: Editor) => {
  const { selection } = editor.view.state
  if (selection.empty) {
    // Cannot create link without selected text
    return false
  }

  // TODO Can only link if the selected content is not multiple items of a list
  return true
}

const RichInputFormMenuBar = ({ editor }: { editor: Editor }) => {
  const [editLink, setEditLink] = useState<EditLinkOptions>({
    onSubmit: () => {},
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
      <RichInputLinkModalForm
        onSubmit={editLink.onSubmit}
        url={editLink.url}
        text={editLink.text}
        onCancel={editLink.onCancel}
      />
    </>
  )
}

export default RichInputFormMenuBar
