import type { ResourcePublished } from '@app/web/server/resources/feature/PublishResource'
import { onPublished } from '@app/web/server/resources/feature/PublishResource.server'
import type {
  ContentProjection,
  ResourceProjection,
} from '@app/web/server/resources/feature/createResourceProjection'
import { type PrismaClient, ResourceLicence } from '@prisma/client'

describe('onPublished', () => {
  const mockTransaction = {
    resource: {
      update: jest.fn(),
    },
  } as unknown as PrismaClient

  const mockEvent: ResourcePublished = {
    type: 'Published',
    timestamp: new Date(),
    data: {
      __version: 2,
      isPublic: false,
    },
  }

  const mockResource: ResourceProjection = {
    id: '6cc07e48-0842-4c57-97e2-a452d0eb60d0',
    slug: 'ressourcerie-veille-et-curation',
    title: 'Ressourcerie Veille & Curation',
    licence: ResourceLicence.ETALAB_2_0,
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
    themes: [],
    resourceTypes: [],
    beneficiaries: [],
    professionalSectors: [],
    contributors: [],
    contents: [],
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

  it('should call the resource repository to update the resource with contents containing order', async () => {
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
    ]
    const resource = { ...mockResource, contents }

    await onPublished(mockEvent, resource, {
      transaction: mockTransaction,
    })

    expect(mockTransaction.resource.update).toHaveBeenCalledWith({
      where: { id: resource.id },

      data: expect.objectContaining({
        contents: {
          deleteMany: {},
          createMany: {
            data: contents.map((content) => ({
              ...content,
              order: content.order,
            })),
          },
        },
      }),
    })
  })

  it('should call the resource repository to update the resource contents with contents without order', async () => {
    const contents = [
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
        id: 'ee361e05-fd5f-468b-9cb8-61117e365687',
        type: 'SectionTitle',
      },
      {
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
        id: '4f7771ed-d071-42ca-a886-9da5e0884d33',
        type: 'File',
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
        id: '7d79b9a1-667a-44be-8f6e-9f46bcb8cbdd',
        type: 'File',
      },
    ] as ContentProjection[]

    const resource = { ...mockResource, contents }

    await onPublished(mockEvent, resource, {
      transaction: mockTransaction,
    })

    expect(mockTransaction.resource.update).toHaveBeenCalledWith({
      where: { id: resource.id },

      data: expect.objectContaining({
        contents: {
          deleteMany: {},
          createMany: {
            data: contents.map((content, index) => ({
              ...content,
              order: index,
            })),
          },
        },
      }),
    })
  })
})
