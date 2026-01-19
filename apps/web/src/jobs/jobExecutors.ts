import { executeAccountInactivityJob } from '@app/web/jobs/account-inactivity/executeAccountInactivityJob'
import { executeBackupDatabaseJob } from '@app/web/jobs/backup-database/executeBackupDatabaseJob'
import { executeImportContactsToBrevo } from '@app/web/jobs/import-contacts-to-brevo/executeImportContactsToBrevo'
import type { Job, JobName, JobPayload } from '@app/web/jobs/jobs'
import { executeMonthlyNewsletterNewsFeed } from '@app/web/jobs/monthly-newsletter-news-feed/executeMonthlyNewsletterNewsFeed'
import { prismaClient } from '@app/web/prismaClient'
import { createStopwatch } from '@app/web/utils/stopwatch'
import * as Sentry from '@sentry/nextjs'
import { v4 } from 'uuid'

export type JobExecutor<Name extends JobName, Result = unknown> = (
  job: Job & { name: Name; payload: JobPayload<Name> },
) => Promise<Result>

// Create an object that for each JobName, MUST has a JobExecutor<Name>
export const jobExecutors: {
  [Name in JobName]: JobExecutor<Name>
} = {
  'account-inactivity': executeAccountInactivityJob,
  'backup-database': executeBackupDatabaseJob,
  'import-contacts-to-brevo': executeImportContactsToBrevo,
  'monthly-newsletter-news-feed': executeMonthlyNewsletterNewsFeed,
}

export const executeJob = async (job: Job) => {
  const stopWatch = createStopwatch()

  const id = v4()

  await prismaClient.jobExecution.create({
    data: {
      id,
      name: job.name,
      data: job.payload,
      started: stopWatch.started,
    },
  })

  try {
    const executor = jobExecutors[job.name] as JobExecutor<(typeof job)['name']>
    const result = await executor(job)
    const { ended, duration } = stopWatch.stop()

    await prismaClient.jobExecution
      .update({
        where: { id },
        data: {
          result: result as Record<string, string>,
          completed: ended,
        },
      })
      .catch((error) => {
        if (Sentry?.captureException) {
          Sentry.captureException(error)
        }
        // biome-ignore lint/suspicious/noConsole: need this for troubleshooting
        console.error(error)
      })

    return {
      id,
      status: 'ok',
      result,
      duration,
    }
  } catch (error) {
    if (Sentry?.captureException) {
      Sentry.captureException(error)
    }
    // biome-ignore lint/suspicious/noConsole: need this for troubleshooting
    console.error(error)
    const { ended, duration } = stopWatch.stop()

    const typedError = error as {
      message?: string
      stack?: string
    }

    await prismaClient.jobExecution
      .update({
        where: { id },
        data: {
          error: typedError.message || 'Unknown error',
          errored: ended,
        },
      })
      .catch((persistenceError) => {
        Sentry.captureException(persistenceError)
      })

    return {
      status: 'error',
      duration,
      error: {
        message: typedError.message || 'Unknown error',
        stack: typedError.stack || undefined,
      },
    }
  }
}
