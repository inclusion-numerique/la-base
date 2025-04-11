import { givenUser } from '@app/e2e/support/given/givenUser'
import type { CreateUserInput } from '@app/e2e/tasks/handlers/user.tasks'
import { ResourceFeedbackStatus } from '@app/web/components/Resource/feedbackBadge/resourceFeedbackBadge.Status'

export const addFeedbackToResource = ({
  slug,
  feedbacks = [],
}: {
  slug: string
  feedbacks: {
    comment?: string
    rate: ResourceFeedbackStatus
    user: Partial<CreateUserInput>
  }[]
}) => {
  for (const feedback of feedbacks) {
    const user = givenUser(feedback.user)
    cy.createUserAndSignin(user)
    cy.visit(`/ressources/${slug}/avis`)
    switch (feedback.rate) {
      case 'non': {
        cy.contains('Non').click()
        break
      }
      case 'moyen': {
        cy.contains('Moyen').click()
        break
      }
      case 'oui': {
        cy.contains('Oui').click()
        break
      }
      case 'beaucoup': {
        cy.contains('Beaucoup').click()
        break
      }
      default: {
        throw new Error('Unknown feedback status')
      }
    }

    if (feedback.comment) {
      cy.get('textarea').first().type(feedback.comment)
    }

    cy.contains('Partager mon avis').click()
    cy.logout()
  }
}
