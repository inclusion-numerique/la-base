import React, { PropsWithChildren, ReactNode } from 'react'
import sanitizeHtml from 'sanitize-html'

export const LabelAndValue = ({
  value,
  defaultValue = null,
  inline = true,
  isHtml = false,
  as: Component = 'li',
  className = '',
  children,
}: PropsWithChildren<{
  value: string | null | number | undefined
  defaultValue?: ReactNode
  inline?: boolean
  isHtml?: boolean
  className?: string
  as?: 'li' | 'div' | 'span'
}>) => {
  if (value === null || value === undefined || value === '') {
    return defaultValue ? (
      <Component className={className}>
        {inline ? <>{children}&nbsp;:&nbsp;</> : <div>{children}</div>}
        <strong>{defaultValue}</strong>
      </Component>
    ) : null
  }
  return (
    <Component className={className}>
      {inline ? <>{children}&nbsp;:&nbsp;</> : <div>{children}</div>}
      {isHtml ? (
        <strong>{value}</strong>
      ) : (
        <strong
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(value.toString()),
          }}
        />
      )}
    </Component>
  )
}
