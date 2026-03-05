import { type PropsWithChildren, type ReactNode } from 'react'
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
        {inline ? (
          <>{children}&nbsp;:&nbsp;</>
        ) : (
          <p className="fr-mb-0">{children}</p>
        )}
        <span className="fr-text--bold">{defaultValue}</span>
      </Component>
    ) : null
  }
  return (
    <Component className={className}>
      {inline ? (
        <>{children}&nbsp;:&nbsp;</>
      ) : (
        <p className="fr-mb-0">{children}</p>
      )}
      {isHtml ? (
        <span className="fr-text--bold">{value}</span>
      ) : (
        <span
          className="fr-text--bold"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(value.toString()),
          }}
        />
      )}
    </Component>
  )
}
