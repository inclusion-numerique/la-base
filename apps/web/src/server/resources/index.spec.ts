import { cleanResources } from '@app/fixtures/resources'
import { getResourcesSlug } from '.'

describe('resources', () => {
  beforeEach(async () => {
    await cleanResources()
  })

  it('should get all slug', async () => {
    const values = await getResourcesSlug()
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
