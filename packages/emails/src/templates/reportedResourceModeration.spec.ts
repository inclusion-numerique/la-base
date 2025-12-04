import { reportedResourceModeration } from '@app/emails/templates/reportedResourceModeration'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: reportedResourceModeration', () => {
  const output = createMjmlTemplateOutput('reportedResourceModeration')

  it('Compiles reported resource moderation react mjml template', async () => {
    const mjml = reportedResourceModeration.mjml({
      resourceName: 'Guide des bonnes pratiques',
      creatorName: 'Marie Dupont',
      moderatorName: 'Jean Martin',
      moderatorEmail: 'moderation@labase.fr',
    })

    expect(mjml).toContain('Guide des bonnes pratiques')
    expect(mjml).toContain('Marie Dupont')
    expect(mjml).toContain('Jean Martin')
    expect(mjml).toContain('moderation@labase.fr')
    expect(mjml).toContain('Signalement et suppression de votre ressource')

    await output(mjml)
  })
})
