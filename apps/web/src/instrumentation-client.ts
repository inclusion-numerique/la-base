import { initializeSentry } from '@app/web/sentry'
import * as Sentry from '@sentry/nextjs'

initializeSentry()

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
