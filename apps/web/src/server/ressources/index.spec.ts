import { cleanRessources } from '@app/fixtures/src/ressources'
import { getRessourcesSlug } from '.'

describe('ressources', () => {
  beforeEach(async () => {
    await cleanRessources()
  })

  it('should get all slug', async () => {
    const values = await getRessourcesSlug()
    const slugs = values.map((value) => value.slug)
    expect(slugs.length).toEqual(2)
    expect(
      slugs.includes(
        '10-raisons-de-venir-sur-la-base-la-deuxième-va-vous-laisser-sans-voix',
      ),
    ).toBeTrue()
    expect(
      slugs.includes('tester-c-est-pour-les-devs-qui-écrivent-des-bugs'),
    ).toBeTrue()
  })
})
