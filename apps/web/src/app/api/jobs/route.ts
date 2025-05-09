import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { executeJobApiTokenHeader } from '@app/web/app/api/jobs/executeJobApiTokenHeader'
import { executeJob } from '@app/web/jobs/jobExecutors'
import { JobValidation } from '@app/web/jobs/jobs'
import * as Sentry from '@sentry/nextjs'
import type { NextRequest } from 'next/server'

export const maxDuration = 600
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const GET = () => new Response(null, { status: 405 })

export const POST = async (request: NextRequest) => {
  if (
    request.headers.get(executeJobApiTokenHeader) !==
    ServerWebAppConfig.internalApiPrivateKey
  ) {
    Sentry.captureException('Invalid API token for job execution', {
      data: {
        [executeJobApiTokenHeader]: request.headers.get(
          executeJobApiTokenHeader,
        ),
      },
    })
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Invalid API token',
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 403,
      },
    )
  }

  const data: unknown = await request.json().catch(() => null)

  if (!data) {
    Sentry.captureException('Invalid JSON payload job execution')

    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Invalid JSON payload format',
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }

  const jobPayload = await JobValidation.safeParseAsync(data)

  if (!jobPayload.success) {
    Sentry.captureException(jobPayload.error)

    return new Response(
      JSON.stringify({
        status: 'error',
        message: jobPayload.error.message,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }

  // biome-ignore lint/suspicious/noConsole: job output
  console.info(`Executing job ${jobPayload.data.name}`)

  const start = Date.now()
  const result = await executeJob(jobPayload.data)
  const done = Date.now()

  return new Response(
    JSON.stringify({
      status: 'ok',
      duration: (done - start) / 1000,
      result,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
