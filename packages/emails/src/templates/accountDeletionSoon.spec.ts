import { accountDeletionSoon } from '@app/emails/templates/accountDeletionSoon'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: accountDeletionSoon', () => {
  const output = createMjmlTemplateOutput('accountDeletionSoon')

  it('Compiles account deletion soon mjml template', async () => {
    const mjml = accountDeletionSoon.mjml({
      firstname: 'Sam',
      email: 'sam@example.com',
      url: 'https://test.local/login',
    })

    expect(mjml).toContain('Votre compte va bientot etre supprime')
    expect(mjml).toContain('sam@example.com')
    expect(mjml).toContain('https://test.local/login')

    await output(mjml)
  })
})
