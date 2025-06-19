import {
  RichInputLink,
  RichInputLinkModal,
} from '@app/ui/components/Form/RichInputLinkModalForm'
import { Editor } from '@tiptap/react'

export type EditLinkOptions = {
  url?: string
  onSubmit: (data: RichInputLink) => void
  onCancel?: () => void
}

export const linkCommandHandler =
  (editor: Editor, setEditLink: (options: EditLinkOptions) => void) => () => {
    const command = editor.chain().focus()
    const currentUrl = editor.getAttributes('link').href as string | undefined

    const removeLink = () => command.unsetLink()
    const setLinkUrl = (url: string) =>
      command.extendMarkRange('link').setLink({
        href: url,
      })

    if (currentUrl) {
      // We are editing an existing link
      // The url is the already existing one
      setEditLink({
        url: currentUrl,
        onSubmit: (data) => {
          // On save we update the link and the text content of the link element

          RichInputLinkModal.close()

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
    setEditLink({
      url: undefined,
      onSubmit: (data) => {
        RichInputLinkModal.close()

        if (data.url) {
          setLinkUrl(data.url)
        }
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
