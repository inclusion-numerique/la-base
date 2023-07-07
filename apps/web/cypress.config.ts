import { defineConfig } from 'cypress'
import 'tsconfig-paths/register'
import { cypressProjectId } from '../../packages/config/src/config'
import { tasks } from './cypress/support/tasks'

export default defineConfig({
  projectId: cypressProjectId,

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },

  viewportWidth: 1024,
  viewportHeight: 768,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', tasks)
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
    scrollBehavior: 'center',
    env: {
      INCLUSION_CONNECT_TEST_USER_EMAIL:
        process.env.INCLUSION_CONNECT_TEST_USER_EMAIL,
      INCLUSION_CONNECT_TEST_USER_PASSWORD:
        process.env.INCLUSION_CONNECT_TEST_USER_PASSWORD,
      MON_COMPTE_PRO_TEST_USER_EMAIL:
        process.env.MON_COMPTE_PRO_TEST_USER_EMAIL,
      MON_COMPTE_PRO_TEST_USER_PASSWORD:
        process.env.MON_COMPTE_PRO_TEST_USER_PASSWORD,
    },
    baseUrl:
      process.env.CYPRESS_BASE_URL ??
      `http://localhost:${process.env.PORT ?? 3000}`,
    chromeWebSecurity: false,
  },
})
