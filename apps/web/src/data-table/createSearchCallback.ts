import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const createSearchCallback =
  <T extends { recherche?: string }>({
    router,
    searchParams,
    baseHref,
  }: {
    router: AppRouterInstance
    searchParams: T
    baseHref: string
  }) =>
  (searchQuery: string) => {
    const queryParams: T = {
      ...searchParams,
    }

    if (searchQuery.trim()) {
      queryParams.recherche = searchQuery
    } else {
      delete queryParams.recherche
    }

    const href = `${baseHref}?${new URLSearchParams(queryParams).toString()}`

    router.push(href)
  }
