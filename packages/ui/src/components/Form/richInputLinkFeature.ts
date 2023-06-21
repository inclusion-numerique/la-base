import { Editor } from '@tiptap/react'
import {
  RichInputLink,
  RichInputLinkModal,
} from '@app/ui/components/Form/RichInputLinkModalForm'

export type EditLinkOptions = {
  text?: string
  url?: string
  onSubmit: (data: RichInputLink) => void
  onCancel?: () => void
}

export const getSelectedText = ({
  selection,
  doc,
}: Editor['view']['state']) => {
  const textParts: string[] = []
  if (selection.from === selection.to) {
    return
  }
  doc.nodesBetween(selection.from, selection.to, (node, position) => {
    // we only processing text, must be a selection
    if (!node.isTextblock) {
      return
    }
    // grab the content
    const substringFrom = Math.max(0, selection.from - position - 1)
    const substringTo = Math.max(0, selection.to - position - 1)
    const textPart = node.textContent.slice(substringFrom, substringTo)
    textParts.push(textPart)
  })

  return textParts.join(' ')
}

// TODO when editing a exising link, I did not succeed in getting the link node when cursor in inside <a> element
export const getSelectedLink = ({
  selection,
  doc,
}: Editor['view']['state']) => {
  const textParts: string[] = []

  doc.nodesBetween(selection.from, selection.to, (node, position) => {
    // we only process text
    if (!node.isTextblock) {
      return
    }

    // grab the content
    const substringFrom = Math.max(0, selection.from - position - 1)
    const substringTo = Math.max(0, selection.to - position - 1)
    const textPart = node.textContent.slice(substringFrom, substringTo)
    textParts.push(textPart)
  })

  return textParts.join(' ')
}

export const linkCommandHandler =
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
          // TODO if selection size is smaller than the <a> element this should change the content of the whole <a> element, NOT the selection content (we can only have the cursor inside the link without any selection)
          command.insertContentAt(
            {
              from: selection.from,
              to: selection.to,
            },
            data.text,
          )

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

    // We are creating a new link

    // On link creation, current text is from selection
    const currentText = getSelectedText(editor.state)

    // No link yet
    setEditLink({
      text: currentText,
      url: undefined,
      onSubmit: (data) => {
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
export const isSelectionOkForLink = (editor: Editor) => {
  const { selection } = editor.view.state
  if (selection.empty) {
    // Cannot create link without selected text
    return false
  }

  // TODO Can only link if the selected content is not multiple items of a list ?
  return true
}
