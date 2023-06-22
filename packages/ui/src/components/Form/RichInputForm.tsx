'use client'

import React, { useState } from 'react'
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from 'react-hook-form'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Link } from '@tiptap/extension-link'
import RichInputFormLinkTooltip from '@app/ui/components/Form/RichInputFormLinkTooltip'
import styles from './RichInputForm.module.css'
import RichInputFormMenuBar from './RichInputFormMenuBar'

const CustomLink = Link.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,
    }
  },
})

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
    extensions: [StarterKit, CustomLink],
    content: form.getValues(path),
    onUpdate: (event) => {
      onChange(event.editor.getHTML() as PathValue<T, Path<T>>)
    },
  })

  // Custom tooltip hover logic
  const [hoveredLinkElement, setHoveredLinkElement] =
    useState<HTMLAnchorElement | null>(null)

  return editor ? (
    <div className={styles.container}>
      <RichInputFormMenuBar editor={editor} />
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
      <RichInputFormLinkTooltip element={hoveredLinkElement} />
    </div>
  ) : null
}

export default RichInputForm
