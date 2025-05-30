import { defineConfig } from 'cypress'
import { cypressProjectId } from '../config/src/config'
import { taskManager } from './cypress/support/taskManager'

export default defineConfig({
  projectId: cypressProjectId,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  video: true,
  videoCompression: true,
  viewportWidth: 1024,
  viewportHeight: 768,

  e2e: {
    setupNodeEvents(on) {
      on('task', taskManager)
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'firefox') {
          launchOptions.preferences['ui.prefersReducedMotion'] = 1
        }
        if (browser.family === 'chromium') {
          launchOptions.args.push('--force-prefers-reduced-motion')
        }
        // Electron does not supports that kind of options.

        launchOptions.env.ELECTRON_EXTRA_LAUNCH_ARGS =
          '--force-prefers-reduced-motion'

        return launchOptions
      })
    },
    env: {},
    baseUrl:
      process.env.CYPRESS_BASE_URL ??
      `http://localhost:${process.env.PORT ?? 3000}`,
    chromeWebSecurity: false,
  },
})
