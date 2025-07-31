import Breadcrumbs from '@app/web/components/Breadcrumbs'

describe('<Breadcrumbs />', () => {
  it('should render a breadcrumbs with no parent', () => {
    cy.mount(<Breadcrumbs currentPage="On est bien la" />)

    cy.get('a').should('have.length', 2)

    cy.get('a[href*="/"]').should('exist')
    cy.get('a[href*="/"]').should('have.text', 'Accueil')

    cy.get('a[aria-current*="page"]').should('have.length', 1)
    cy.get('a[aria-current*="page"]').should('have.text', 'On est bien la')
  })
})
