'use client'

import React, { useState } from 'react'
import { Plugin } from 'prosemirror-state'
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from 'react-hook-form'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkBase from '@tiptap/extension-link'
import RichInputFormLinkTooltip from '@app/ui/components/Form/RichInputFormLinkTooltip'
import styles from './RichInputForm.module.css'
import RichInputFormMenuBar from './RichInputFormMenuBar'

// TODO This maybe could be used for link tooltip features ?
export const ExtendedLink = LinkBase.extend({
  addProseMirrorPlugins: () => [
    new Plugin({
      props: {
        handleDOMEvents: {
          mouseover: (view, event) => {
            console.log('Plugin extension mouseover', { view, event })
          },
        },
      },
    }),
  ],
})

// TODO I tried to use this to set the cursor on the tooltip target <a> element to update editor selection but it does not work
const selectEditorElement = (element: HTMLElement) => {
  const selection = window.getSelection()
  if (!selection) {
    return
  }
  const range = document.createRange()
  selection.removeAllRanges()
  range.selectNodeContents(element)
  range.collapse(false)
  selection.addRange(range)
  element.focus()
}

const RichInputForm = <T extends FieldValues>({
  form,
  path,
  id,
  ariaDescribedBy,
  placeholder,
  disabled,
  'data-testid': dataTestId,
  onChange,
}: {
  form: UseFormReturn<T>
  path: FieldPath<T>
  id: string
  ariaDescribedBy?: string
  placeholder?: string
  disabled?: boolean
  ['data-testid']?: string
  onChange: (text: PathValue<T, Path<T>>) => void
}) => {
  const editor = useEditor({
    // TODO if ExtendedLink is not useful, just put back Link in extensions
    extensions: [StarterKit, ExtendedLink],
    content: form.getValues(path),
    onUpdate: (event) => {
      onChange(event.editor.getHTML() as PathValue<T, Path<T>>)
    },
  })

  // Custom tooltip hover logic
  const [hoveredLinkElement, setHoveredLinkElement] =
    useState<HTMLAnchorElement | null>(null)

  // TODO update selection to element and trigger the link handler (maybe create the handler here and pass to menubar as a prop)
  const onTooltipEdit = (element: HTMLAnchorElement) => {
    selectEditorElement(element)
  }
  // TODO update selection to element and Trigger unlink command
  const onTooltipDelete = (element: HTMLAnchorElement) => {
    selectEditorElement(element)
  }

  return editor ? (
    <div className={styles.container}>
      <RichInputFormMenuBar
        editor={editor}
        hoveredLinkElement={hoveredLinkElement}
      />
      <EditorContent
        editor={editor}
        className={styles.input}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        id={id}
        onMouseOver={(event) => {
          if (event.target instanceof HTMLAnchorElement) {
            setHoveredLinkElement(event.target)
          }
        }}
        onMouseOut={(event) => {
          if (event.target instanceof HTMLAnchorElement) {
            setHoveredLinkElement(null)
          }
        }}
        placeholder={placeholder}
        data-testid={dataTestId}
      />
      <RichInputFormLinkTooltip
        element={hoveredLinkElement}
        onEdit={onTooltipEdit}
        onDelete={onTooltipDelete}
      />
    </div>
  ) : null
}

export default RichInputForm
