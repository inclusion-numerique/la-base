import { mount } from 'cypress/react'
import '../../../../apps/web/public/dsfr/dsfr.module.min'
// import '@app/web/styles/index.css'
import './commands'
import './component.css'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)
