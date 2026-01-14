import { baseJoinRequest } from '@app/emails/templates/baseJoinRequest'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: inviteMember', () => {
  const output = createMjmlTemplateOutput('baseJoinRequest')

  it('Compiles hello world react mjml template', async () => {
    const baseTitle = 'Collectivité de Montréal'
    const applicant = {
      name: 'Jean-Michel Auclair',
      firstName: 'Jean-Michel',
      lastName: 'Auclair',
      email: 'jean-michel.auclair@example.com',
      slug: '/profils/jean-michel-auclair',
    }
    const mjml = baseJoinRequest.mjml({
      baseTitle,
      applicant,
      profileUrl: 'https://test.local?token=oui',
      url: 'https://test.local?token=oui',
    })

    expect(mjml).toContain(
      `${applicant.name} demande à rejoindre la base ${baseTitle}`,
    )
    expect(mjml).toContain('https://test.local?token=oui')

    await output(mjml)
  })
})
