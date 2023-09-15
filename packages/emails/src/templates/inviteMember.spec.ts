import { inviteMember } from '@app/emails/templates/inviteMember'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: inviteMember', () => {
  const output = createMjmlTemplateOutput('inviteMember')

  it('Compiles hello world react mjml template', async () => {
    const mjml = inviteMember.mjml({
      baseTitle: 'Ma base',
      from: 'Abd Al Malik',
      url: 'https://test.local?token=oui',
    })

    expect(mjml).toContain(
      'Vous êtes invité par Abd Al Malik à rejoindre la Base Ma base.',
    )
    expect(mjml).toContain('https://test.local?token=oui')

    await output(mjml)
  })
})
