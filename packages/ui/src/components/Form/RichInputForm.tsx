'use client'

import React, { ReactNode, useEffect, useState } from 'react'
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
  label,
  hint,
  form,
  path,
  id,
  ariaDescribedBy,
  placeholder,
  disabled,
  'data-testid': dataTestId,
  onChange,
}: {
  label?: ReactNode
  hint?: ReactNode
  form: UseFormReturn<T>
  path: FieldPath<T>
  id: string
  ariaDescribedBy?: string
  placeholder?: string
  disabled?: boolean
  ['data-testid']?: string
  onChange?: (text: PathValue<T, Path<T>>) => void
}) => {
  const editor = useEditor({
    extensions: [StarterKit, CustomLink],
    content: form.getValues(path),
    onUpdate: (event) => {
      if (onChange) {
        const html = event.editor.getHTML()
        // An empty html still contains a paragraph
        onChange((html === '<p></p>' ? '' : html) as PathValue<T, Path<T>>)
      }
    },
    editable: !disabled,
  })

  // Custom tooltip hover logic
  const [hoveredLinkElement, setHoveredLinkElement] =
    useState<HTMLAnchorElement | null>(null)

  useEffect(() => {
    editor?.setEditable(!disabled)
  }, [editor, disabled])

  return (
    <>
      {label && (
        <label className="fr-label fr-mb-1w" htmlFor={id}>
          {label}
          {hint && <span className="fr-mt-1v fr-hint-text">{hint}</span>}
        </label>
      )}
      {editor ? (
        <div className={styles.container}>
          <RichInputFormMenuBar editor={editor} disabled={disabled} />
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
      ) : null}
    </>
  )
}

export default RichInputForm
