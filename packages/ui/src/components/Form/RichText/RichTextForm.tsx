'use client'

import RichTextFormLinkTooltip from '@app/ui/components/Form/RichText/RichTextFormLinkTooltip'
import { Link, type LinkOptions } from '@tiptap/extension-link'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ReactNode, useState } from 'react'
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from 'react-hook-form'
import styles from './RichTextForm.module.css'
import RichTextFormMenuBar from './RichTextFormMenuBar'

const CustomLink = Link.extend({
  addOptions() {
    return {
      // `.extend()` a toujours un parent, mais tiptap 3 le type comme optionnel
      // et rend les champs de LinkOptions obligatoires
      ...(this.parent?.() as LinkOptions),
      openOnClick: false,
    }
  },
})

const RichTextForm = <T extends FieldValues>({
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
  'data-testid'?: string
  onChange?: (text: PathValue<T, Path<T>>) => void
}) => {
  const editor = useEditor({
    // Le StarterKit de tiptap 3 embarque Link : sans cette désactivation, il entre en
    // conflit avec CustomLink, deux extensions ne pouvant porter le même nom.
    extensions: [StarterKit.configure({ link: false }), CustomLink],
    content: form.getValues(path),
    immediatelyRender: false,
    onUpdate: (event) => {
      if (onChange) {
        onChange(event.editor.getHTML() as PathValue<T, Path<T>>)
      }
    },
  })

  // Custom tooltip hover logic
  const [hoveredLinkElement, setHoveredLinkElement] =
    useState<HTMLAnchorElement | null>(null)

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
          <RichTextFormMenuBar editor={editor} />
          <EditorContent
            editor={editor}
            className={styles.input}
            aria-label={typeof label === 'string' ? label : undefined}
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
          <RichTextFormLinkTooltip element={hoveredLinkElement} />
        </div>
      ) : null}
    </>
  )
}

export default RichTextForm
