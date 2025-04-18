import {
  ContentProjection,
  ResourceProjection,
} from '@app/web/server/resources/feature/createResourceProjection'
import { ContentReordered } from '@app/web/server/resources/feature/ReorderContent'
import { applyContentReordered } from '@app/web/server/resources/feature/ReorderContent.server'

describe('applyContentReordered', () => {
  const contentToReorder: ContentProjection = {
    title: 'Tableur pour aider à la veille/prépa NL',
    text: null,
    fileKey:
      'user/fce7f55b-56a1-4a3e-b80c-c0a75dd10d4d/MA_pTLmG06-oYI2ql4NC9_Veille NL.xlsx',
    imageId: null,
    imageAltText: null,
    caption:
      'Inspiré du tableau de Sarah, et par rapport à mon besoin, je viens de [me] faire ce tableau pour faciliter et optimiser la veille pour les NL\n' +
      'La version google Sheets : xxxx',
    url: null,
    showPreview: null,
    linkDescription: null,
    linkTitle: null,
    linkImageUrl: null,
    linkFaviconUrl: null,
    order: 2,
    id: '4f7771ed-d071-42ca-a886-9da5e0884d33',
    type: 'File',
  }
  const contents: ContentProjection[] = [
    {
      title: 'Outils',
      text: null,
      fileKey: null,
      imageId: null,
      imageAltText: null,
      caption: null,
      url: null,
      showPreview: null,
      linkDescription: null,
      linkTitle: null,
      linkImageUrl: null,
      linkFaviconUrl: null,
      order: 1,
      id: 'ee361e05-fd5f-468b-9cb8-61117e365687',
      type: 'SectionTitle',
    },
    {
      title: 'tableau google sheet pour organiser sa veille',
      text: null,
      fileKey: null,
      imageId: null,
      imageAltText: null,
      caption: "(l'original de celui qui a été extrait juste au dessus)",
      url: 'xxx',
      showPreview: null,
      linkDescription: null,
      linkTitle: null,
      linkImageUrl: null,
      linkFaviconUrl: null,
      order: 3,
      id: '2bda6d66-e2e7-4546-946e-f582310e6eb0',
      type: 'Link',
    },
    {
      title: 'Développer 1 plateforme collaborative de veille',
      text: null,
      fileKey:
        'user/fce7f55b-56a1-4a3e-b80c-c0a75dd10d4d/eyosRPQVIqUiGQ-0WEtBm_comment_developper_gratuitement_une_plateforme_de_veilles_partagees_avec....pdf',
      imageId: null,
      imageAltText: null,
      caption:
        'Voici le référentiel sur lequel ils se sont basés pour leur veille en commun intra CD du Tarn',
      url: null,
      showPreview: null,
      linkDescription: null,
      linkTitle: null,
      linkImageUrl: null,
      linkFaviconUrl: null,
      order: 4,
      id: '7d79b9a1-667a-44be-8f6e-9f46bcb8cbdd',
      type: 'File',
    },
    contentToReorder,
  ]
  const resource: ResourceProjection = {
    id: '6cc07e48-0842-4c57-97e2-a452d0eb60d0',
    slug: 'ressourcerie-veille-et-curation',
    title: 'Ressourcerie Veille & Curation',
    description:
      "Retrouvez les outils, sites utiles, mines d'or, fiches pratiques et autres ressources qui nous semblent utiles pour mieux faire sa veille, ses NL, mettre en place des chats... en un mot COM-MU-NI-QUER !!",
    excerpt:
      "Retrouvez les outils, sites utiles, mines d'or, fiches pratiques et autres ressources qui nous semblent utiles pour mieux faire sa veille, ses NL, mettre en place des chats... en un mot COM-MU-NI-QUER !!",
    baseId: '87422ece-4de7-42c4-a55a-229aace641d3',
    legacyId: null,
    created: new Date('2025-02-13T15:18:21.901Z'),
    updated: new Date('2025-04-15T07:24:23.897Z'),
    published: new Date('2025-03-13T14:16:26.359Z'),
    deleted: null,
    lastPublished: new Date('2025-02-13T15:19:32.275Z'),
    createdById: 'fce7f55b-56a1-4a3e-b80c-c0a75dd10d4d',
    imageId: null,
    isPublic: false,
    contents,
    themes: [],
    supportTypes: [],
    targetAudiences: [],
    contributors: [],
    collections: [],
    viewsCount: 0,
    _count: { collections: 0, resourceFeedback: 0 },
    resourceFeedback: [],
    feedbackAverage: 0,
    feedbackCount: {
      notRecommended: 0,
      moderatelyRecommended: 0,
      recommended: 0,
      highlyRecommended: 0,
    },
    publicFeedback: true,
  }

  const newlyContentReordered: ContentReordered = {
    type: 'ContentReordered',
    timestamp: new Date(),
    data: {
      order: 2,
      __version: 1,
      id: contentToReorder.id,
    },
  }

  describe('case without duplicate order', () => {
    it.each([
      {
        name: 'reorder content at position 3',
        contentReordered: {
          ...newlyContentReordered,
          data: { ...newlyContentReordered.data, order: 3 },
        },
        expectedContents: [
          { id: contents[0].id, order: 1 },
          { id: contents[1].id, order: 2 },
          { id: newlyContentReordered.data.id, order: 3 },
          { id: contents[2].id, order: 4 },
        ],
      },
      {
        name: 'reorder content at position 1',
        contentReordered: {
          ...newlyContentReordered,
          data: { ...newlyContentReordered.data, order: 1 },
        },
        expectedContents: [
          { id: newlyContentReordered.data.id, order: 1 },
          { id: contents[0].id, order: 2 },
          { id: contents[1].id, order: 3 },
          { id: contents[2].id, order: 4 },
        ],
      },
      {
        name: 'reorder content at the end of the list',
        contentReordered: {
          ...newlyContentReordered,
          data: { ...newlyContentReordered.data, order: 4 },
        },
        expectedContents: [
          { id: contents[0].id, order: 1 },
          { id: contents[1].id, order: 2 },
          { id: contents[2].id, order: 3 },
          { id: newlyContentReordered.data.id, order: 4 },
        ],
      },
    ])('$name', ({ contentReordered, expectedContents }) => {
      const result = applyContentReordered(contentReordered, resource)

      expect(result.contents).toHaveLength(4)

      for (const [index, expected] of expectedContents.entries()) {
        const actualContent = result.contents[index]
        expect(actualContent.id).toBe(expected.id)
        expect(actualContent.order).toBe(expected.order)
      }
    })
  })

  describe('case with duplicate order', () => {
    it.each([
      {
        name: 'move content up with duplicate orders',
        resourceWithDuplicates: {
          ...resource,
          contents: [
            { ...contents[0], order: 1 },
            { ...contents[1], order: 2 },
            { ...contents[2], order: 2 }, // <- Duplicate order
            { ...contentToReorder, order: 3 },
          ],
        },
        event: {
          type: 'ContentReordered' as const,
          timestamp: new Date(),
          data: {
            id: contentToReorder.id,
            order: 2,
            __version: 1 as const,
          },
        },
        expectedContents: [
          { id: contents[0].id, order: 1 },
          { id: contentToReorder.id, order: 2 },
          { id: contents[1].id, order: 3 },
          { id: contents[2].id, order: 4 },
        ],
      },
      {
        name: 'move content down with duplicate orders',
        resourceWithDuplicates: {
          ...resource,
          contents: [
            { ...contents[0], order: 1 },
            { ...contents[1], order: 2 },
            { ...contents[2], order: 2 }, // <- Duplicate order
            { ...contentToReorder, order: 3 },
          ],
        },
        event: {
          type: 'ContentReordered' as const,
          timestamp: new Date(),
          data: {
            id: contents[2].id,
            order: 3,
            __version: 1 as const,
          },
        },
        expectedContents: [
          { id: contents[0].id, order: 1 },
          { id: contents[1].id, order: 2 },
          { id: contents[2].id, order: 3 },
          { id: contentToReorder.id, order: 4 },
        ],
      },
      {
        name: 'move content to first position with duplicate orders',
        resourceWithDuplicates: {
          ...resource,
          contents: [
            { ...contents[0], order: 1 },
            { ...contents[1], order: 2 },
            { ...contents[2], order: 2 }, // <- Duplicate order
            { ...contentToReorder, order: 3 },
          ],
        },
        event: {
          type: 'ContentReordered' as const,
          timestamp: new Date(),
          data: {
            id: contentToReorder.id,
            order: 1,
            __version: 1 as const,
          },
        },
        expectedContents: [
          { id: contentToReorder.id, order: 1 },
          { id: contents[0].id, order: 2 },
          { id: contents[1].id, order: 3 },
          { id: contents[2].id, order: 4 },
        ],
      },
    ])('$name', ({ resourceWithDuplicates, event, expectedContents }) => {
      const result = applyContentReordered(event, resourceWithDuplicates)

      // we check all orders are unique
      const orders = result.contents.map((c) => c.order)
      const uniqueOrders = new Set(orders)
      expect(orders.length).toBe(uniqueOrders.size)

      // we check the content is at the right position based on its order
      for (const [index, expected] of expectedContents.entries()) {
        const actualContent = result.contents[index]
        expect(actualContent.id).toBe(expected.id)
        expect(actualContent.order).toBe(expected.order)
      }
    })
  })
})
