import { givenUser } from '@app/e2e/support/given/givenUser'
import type { CreateUserInput } from '@app/e2e/tasks/handlers/user.tasks'

export const addFeedbackToResource = ({
  slug,
  feedbacks = [],
}: {
  slug: string
  feedbacks: {
    comment?: string
    rate: 1 | 2 | 3 | 4
    user: Partial<CreateUserInput>
  }[]
}) => {
  for (const feedback of feedbacks) {
    const user = givenUser(feedback.user)
    cy.createUserAndSignin(user)
    cy.visit(`/ressources/${slug}/avis`)
    switch (feedback.rate) {
      case 1: {
        cy.contains('Non').click()
        break
      }
      case 2: {
        cy.contains('Moyen').click()
        break
      }
      case 3: {
        cy.contains('Oui').click()
        break
      }
      case 4: {
        cy.contains('Beaucoup').click()
        break
      }
      default: {
        cy.contains('Oui').click()
      }
    }

    if (feedback.comment) {
      cy.get('textarea').first().type(feedback.comment)
    }

    cy.contains('Partager mon avis').click()
    cy.logout()
  }
}
