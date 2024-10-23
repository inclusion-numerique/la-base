import Link from 'next/link'

export type SortDirection = 'asc' | 'desc'

export type SortLinkProps = {
  ordre: SortDirection
  isActive?: boolean
  accessibilityTitle?: string
  href: string
}

const SortLink = ({
  ordre,
  isActive,
  accessibilityTitle,
  href,
}: SortLinkProps) => {
  const isDesc = ordre === 'desc'
  const isAsc = !isDesc

  const icon =
    isActive && isAsc ? 'fr-icon-arrow-up-line' : 'fr-icon-arrow-down-line'

  const title = accessibilityTitle
    ? `Trier par ${accessibilityTitle}, ordre ${
        isActive && isAsc ? 'décroissant' : 'croissant'
      }`
    : undefined

  return (
    <Link
      className={`fr-btn fr-ml-2v fr-btn--tertiary-no-outline fr-btn--sm ${icon}`}
      title={title}
      href={href}
      style={{
        color: isActive ? undefined : 'var(--text-disabled-grey)',
      }}
    />
  )
}

export default SortLink
