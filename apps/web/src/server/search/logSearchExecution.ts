import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import type {
  PaginationParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'
import type { SearchType } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import { v4 } from 'uuid'

type LogSearchExecutionInput = {
  type: SearchType
  searchParams: SearchParams
  paginationParams: PaginationParams
  duration: number
  results: number
  user: Pick<SessionUser, 'id'> | null
}

export const logSearchExecution = ({
  searchParams,
  paginationParams,
  user,
  type,
  results,
  duration,
}: LogSearchExecutionInput) =>
  prismaClient.searchExecution.create({
    data: {
      id: v4(),
      type,
      userId: user?.id,
      results,
      duration,
      themes: searchParams.themes,
      query: searchParams.query ?? '',
      page: paginationParams.page,
      perPage: paginationParams.perPage,
      resourceTypes: searchParams.resourceTypes,
      targetAudiences: searchParams.targetAudiences,
      sorting: paginationParams.sort,
      departments: searchParams.departements,
    },
  })

export const backgroundLogSearchExecution = (
  input: LogSearchExecutionInput,
) => {
  logSearchExecution(input).catch((error) => {
    Sentry.captureException(error)
  })
}
