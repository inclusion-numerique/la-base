import { acceptedBaseInvitation } from '@app/emails/templates/acceptedBaseInvitation'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: acceptedBaseInvitation', () => {
  const output = createMjmlTemplateOutput('acceptedBaseInvitation')

  it('Compiles hello world react mjml template', async () => {
    const mjml = acceptedBaseInvitation.mjml({
      baseTitle: 'Ma base',
      memberName: 'Abd Al Malik',
    })

    expect(mjml).toContain(
      'Abd Al Malik a accepté votre invitation à rejoindre la base Ma base',
    )

    await output(mjml)
  })
})
