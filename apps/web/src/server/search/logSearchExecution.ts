import * as Sentry from '@sentry/nextjs'
import type { SearchType } from '@prisma/client'
import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import {
  PaginationParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'
import { SessionUser } from '@app/web/auth/sessionUser'

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
      supportTypes: searchParams.supportTypes,
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
