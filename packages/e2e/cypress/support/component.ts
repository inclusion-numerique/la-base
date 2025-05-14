import { mount } from 'cypress/react'
// eslint-disable-next-line import/no-relative-packages
import '../../../../apps/web/public/dsfr/dsfr.module.min'
// eslint-disable-next-line import/no-relative-packages
// import '@app/web/styles/index.css'
import './commands'
import './component.css'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)
