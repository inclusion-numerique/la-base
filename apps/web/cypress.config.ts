import { defineConfig } from 'cypress'
import { cypressProjectId } from '../../packages/config/src/config'

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
    },
    baseUrl:
      process.env.CYPRESS_BASE_URL ??
      `http://localhost:${process.env.PORT ?? 3000}`,
  },
})
