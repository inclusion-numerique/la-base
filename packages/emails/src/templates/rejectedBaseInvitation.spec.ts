import { rejectedBaseInvitation } from '@app/emails/templates/rejectedBaseInvitation'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: rejectedBaseInvitation', () => {
  const output = createMjmlTemplateOutput('rejectedBaseInvitation')

  it('Compiles hello world react mjml template', async () => {
    const mjml = rejectedBaseInvitation.mjml({
      baseTitle: 'Ma base',
      memberName: 'Abd Al Malik',
    })

    expect(mjml).toContain(
      'Abd Al Malik a refusé votre invitation à rejoindre la base Ma base',
    )

    await output(mjml)
  })
})
