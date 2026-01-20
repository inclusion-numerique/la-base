import { accountDeleted } from '@app/emails/templates/accountDeleted'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: accountDeleted', () => {
  const output = createMjmlTemplateOutput('accountDeleted')

  it('Compiles account deleted mjml template', async () => {
    const mjml = accountDeleted.mjml({
      url: 'https://test.local/signup',
    })

    expect(mjml).toContain('Votre compte a été supprimé')
    expect(mjml).toContain('https://test.local/signup')

    await output(mjml)
  })
})
