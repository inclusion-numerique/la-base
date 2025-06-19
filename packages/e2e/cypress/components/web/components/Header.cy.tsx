import Header from '@app/web/components/Header'
import React from 'react'

describe('<Header />', () => {
  it('Should display desktop header without dropshadow', () => {
    cy.viewport(1200, 750) // Set viewport to 550px x 750px
    cy.mount(<Header />)
    cy.get('.fr-header').should('have.css', 'filter', 'none')
    cy.get('.fr-header__brand').should('have.css', 'filter', 'none')
  })

  it('Should display mobile header without dropshadow', () => {
    cy.viewport(500, 500) // Set viewport to 550px x 750px
    cy.mount(<Header />)
    cy.get('.fr-header').should('have.css', 'filter', 'none')
    cy.get('.fr-header__brand').should('have.css', 'filter', 'none')
  })
})
