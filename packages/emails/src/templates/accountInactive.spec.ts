import { accountInactive } from '@app/emails/templates/accountInactive'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: accountInactive', () => {
  const output = createMjmlTemplateOutput('accountInactive')

  it('Compiles account inactive mjml template', async () => {
    const mjml = accountInactive.mjml({
      firstname: 'Alex',
      email: 'alex@example.com',
      url: 'https://test.local/login',
    })

    expect(mjml).toContain('Votre compte est inactif')
    expect(mjml).toContain('alex@example.com')
    expect(mjml).toContain('https://test.local/login')

    await output(mjml)
  })
})
