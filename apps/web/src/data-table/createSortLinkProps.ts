import type { SortDirection } from '@app/web/data-table/SortLink'

export const createSortLinkProps = <
  T extends { tri?: string; ordre?: SortDirection },
  V extends { tri?: string; ordre?: SortDirection },
>({
  sortParams,
  searchParams,
  defaultSortableDirection = 'asc',
  isDefault = false,
  baseHref,
}: {
  searchParams: T
  sortParams: V
  isDefault?: boolean
  defaultSortableDirection?: SortDirection
  baseHref: string
}) => {
  const params = {
    ...searchParams,
    ...sortParams,
  }

  const isActiveByDefault = !searchParams.tri && isDefault

  const isActive = isActiveByDefault || searchParams.tri === sortParams.tri

  const ordre =
    isActiveByDefault && !searchParams.ordre
      ? defaultSortableDirection === 'desc'
        ? 'asc'
        : 'desc'
      : isActive
        ? searchParams.ordre === 'desc'
          ? 'asc'
          : 'desc'
        : 'asc'

  const props = {
    ...params,
    isActive,
    ordre,
  }

  const href = `${baseHref}?${new URLSearchParams({
    ...params,
    ordre,
  }).toString()}`

  return { ...props, href }
}
