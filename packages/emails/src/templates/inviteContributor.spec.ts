import { inviteContributor } from '@app/emails/templates/inviteContributor'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: inviteContributor', () => {
  const output = createMjmlTemplateOutput('inviteContributor')

  it('Compiles hello world react mjml template', async () => {
    const mjml = inviteContributor.mjml({
      resourceTitle: 'Ma ressource',
      from: 'Abd Al Malik',
      url: 'https://test.local?token=oui',
    })

    expect(mjml).toContain(
      'Vous êtes invité par Abd Al Malik à contribuer à la ressource Ma ressource.',
    )
    expect(mjml).toContain('https://test.local?token=oui')

    await output(mjml)
  })
})
