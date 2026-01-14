import { acceptedBaseJoinRequest } from '@app/emails/templates/acceptedBaseJoinRequest'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: acceptedBaseJoinRequest', () => {
  const output = createMjmlTemplateOutput('acceptedBaseJoinRequest')

  it('Compiles hello world react mjml template', async () => {
    const mjml = acceptedBaseJoinRequest.mjml({
      baseTitle: 'Ma base',
      url: 'https://test.local?token=oui',
      adminName: 'Abd Al Malik',
    })

    expect(mjml).toContain(
      'Abd Al Malik a accepté votre demande de rejoindre la base Ma base',
    )

    expect(mjml).toContain('https://test.local?token=oui')

    await output(mjml)
  })
})
