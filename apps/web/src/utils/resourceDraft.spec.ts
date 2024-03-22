import { applyDraft } from './resourceDraft'

const resource = { title: 'Hello', description: 'World', published: null }
const resourceDraft = {
  title: 'Hello draft',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab asperiores consectetur corporis cum cumque debitis deserunt, eligendi est illo magnam minima natus possimus quae reiciendis tempora veritatis vero voluptatibus. A accusantium ad animi asperiores atque consequuntur debitis dolore ducimus eligendi et explicabo iste laboriosam, maxime possimus ratione rem sit tempora voluptatem.',
  image: null,
  contents: [],
}

describe('resource draft', () => {
  it('should apply draft when resource is not published draft is not null', () => {
    expect(applyDraft({ published: null }, resourceDraft)).toStrictEqual({
      title: resourceDraft.title,
      description: resourceDraft.description,
      published: null,
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab asperiores consectetur corporis cum cumque debitis deserunt, eligendi est illo magnam minima natus possimus quae reiciendis tempora veritatis vero voluptatibus. A accusantium ad animi asperiores atque consequuntur debitis dolore ducimus ',
      image: null,
      contents: [],
    })
  })

  it('should do nothing when resource is published', () => {
    expect(
      applyDraft({ published: new Date('2024-02-14') }, resourceDraft),
    ).toStrictEqual({ published: new Date('2024-02-14') })
  })

  it('should do nothing when resource draft is null', () => {
    expect(applyDraft({ published: null }, null)).toStrictEqual({
      published: null,
    })
  })

  it('should do nothing when saved resource is null', () => {
    expect(applyDraft(null, resourceDraft)).toBeNull()
  })

  it('should do nothing when draft resource is null', () => {
    expect(applyDraft(resource, null)).toStrictEqual(resource)
  })

  it('should update saved ressource title and description with draft data', () => {
    expect(applyDraft(resource, resourceDraft)).toStrictEqual({
      title: resourceDraft.title,
      description: resourceDraft.description,
      published: null,
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab asperiores consectetur corporis cum cumque debitis deserunt, eligendi est illo magnam minima natus possimus quae reiciendis tempora veritatis vero voluptatibus. A accusantium ad animi asperiores atque consequuntur debitis dolore ducimus ',
      image: null,
      contents: [],
    })
  })
})
