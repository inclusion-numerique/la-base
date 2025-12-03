import { MOCK_NEWS_FEED_RESOURCES } from '@app/emails/mocks/newsFeedResources'
import { newsFeedNewsletter } from '@app/emails/templates/newsFeedNewsletter'
import { createMjmlTemplateOutput } from '../outputTemplateHtml'

describe('Template: newsFeedNewsletter', () => {
  const output = createMjmlTemplateOutput('newsFeedNewsletter')

  it('Compiles news feed newsletter react mjml template', async () => {
    const count = 54
    const mjml = newsFeedNewsletter.mjml({
      count,
      resources: MOCK_NEWS_FEED_RESOURCES,
    })

    expect(mjml).toContain(
      'Résumé mensuel des dernières publications lié à vos préférences',
    )
    expect(mjml).toContain(
      `Ce mois-ci, découvrez ${count} nouvelles ressources liés à vos préférences publiées sur Les Bases.`,
    )

    await output(mjml)
  })
})
