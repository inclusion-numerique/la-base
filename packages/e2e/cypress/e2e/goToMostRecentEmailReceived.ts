export const goToMostRecentEmailReceived = ({
  subjectInclude,
}: {
  subjectInclude: string
}) => {
  cy.log('Go check emails in maildev server')
  // Go to maildev server to checkout the email and get the magic link
  cy.visit('http://127.0.0.1:1080')
  cy.get('.email-list li a').first().click()

  cy.get('.email-meta .subject').should('contain', subjectInclude)

  // Cypress does not work well with iframes, we go to the html source of the email that is
  // included in the iframe preview of maildev ui
  cy.url().then((url) => {
    const emailPath = url.split('#').at(-1)
    if (!emailPath) {
      throw new Error('Could not find email content path from maildev url')
    }
    cy.visit(`http://127.0.0.1:1080${emailPath}/html`)
  })
}
