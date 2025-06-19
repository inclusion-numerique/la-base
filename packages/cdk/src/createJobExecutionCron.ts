import { ContainerCron } from '@app/scaleway/container-cron'
import type { Job } from '@app/web/jobs/jobs'
import type { Construct } from 'constructs'

/**
 * See https://www.scaleway.com/en/docs/serverless/containers/concepts/#trigger
 */
export const createJobExecutionCron = (
  scope: Construct,
  {
    name,
    job,
    schedule,
    containerId,
  }: {
    name: string
    job: Job
    schedule: string
    containerId: string
  },
) => {
  const jsonData = JSON.stringify(job)

  new ContainerCron(scope, `trigger-${name}`, {
    name,
    schedule,
    containerId,
    args: jsonData,
  })
}
