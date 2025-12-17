import { rejectedBaseJoinRequest } from '@app/emails/templates/rejectedBaseJoinRequest'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: rejectedBaseJoinRequest', () => {
  const output = createMjmlTemplateOutput('rejectedBaseJoinRequest')

  it('Compiles hello world react mjml template', async () => {
    const mjml = rejectedBaseJoinRequest.mjml({
      baseTitle: 'Ma base',
      adminName: 'Abd Al Malik',
    })

    expect(mjml).toContain(
      'Abd Al Malik a refusé votre demande de rejoindre la base Ma base',
    )

    await output(mjml)
  })
})
