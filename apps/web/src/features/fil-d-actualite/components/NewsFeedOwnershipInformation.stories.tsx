import { mobileStory } from '@app/storybook/storyHelper'
import { NewsFeedOwnershipInformation } from '@app/web/features/fil-d-actualite/components/NewsFeedOwnershipInformation'
import type {
  NewsFeedPageContext,
  NewsFeedResource,
} from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { ProfessionalSector, Theme } from '@prisma/client'
import type { Meta, StoryObj } from '@storybook/nextjs'
import type { ComponentProps } from 'react'

export default {
  title: "Fil d'actualité/NewsFeedOwnershipInformation",
  component: NewsFeedOwnershipInformation,
} as Meta<typeof NewsFeedOwnershipInformation>

type Story = StoryObj<typeof NewsFeedOwnershipInformation>

const baseDate = new Date('2025-10-22T10:00:00Z')
const updatedDate = new Date('2025-10-22T14:30:00Z')

const mockBase = {
  id: 'base-1',
  title: 'Base Innovation Numérique',
  slug: 'base-innovation-numerique',
  isPublic: true,
  image: null,
  department: null,
  excerpt: "Une base dédiée à l'innovation numérique",
  followedBy: [],
  coverImage: null,
  members: [],
  _count: {
    resourcesViews: 123,
    resources: 15,
    followedBy: 42,
  },
}

const mockCreatedBy = {
  id: 'user-1',
  email: 'marie.dupont@example.com',
  slug: 'marie-dupont',
  name: 'Marie Dupont',
  firstName: 'Marie',
  lastName: 'Dupont',
  image: { id: 'portrait-marie', altText: 'Portrait de Marie' },
  resourceEvent: [],
  createdResources: [],
  resources: [],
  followedBy: [],
  isPublic: true,
  _count: {
    createdResources: 5,
    resources: 3,
    followedBy: 12,
  },
}

const mockCollection = {
  id: 'collection-1',
  slug: 'Collections-accessibilite',
  title: 'Collections Accessibilité',
  baseId: 'base-1',
  createdById: 'user-1',
  base: {
    image: null,
    id: 'base-1',
    title: 'Base Innovation Numérique',
    slug: 'base-innovation-numerique',
  },
  createdBy: {
    image: {
      id: 'portrait-marie',
      legacyId: null,
      altText: 'Portrait de Marie',
      blurUrl: null,
      originalHeight: null,
      originalWidth: null,
      cropHeight: 0,
      cropWidth: 0,
      cropTop: 0,
      cropLeft: 0,
      height: null,
      width: null,
      dataUrl: null,
      uploadKey: 'upload-key-marie',
    },
    id: 'user-1',
    name: 'Marie Dupont',
    firstName: 'Marie',
    lastName: 'Dupont',
    slug: 'marie-dupont',
  },
}

const baseResource: NewsFeedResource = {
  collectionId: undefined,
  addedToCollectionAt: undefined,
  id: 'resource-1',
  title: "Guide pratique de l'accessibilité numérique",
  slug: 'guide-pratique-accessibilite-numerique',
  excerpt:
    'Un guide complet pour rendre vos sites web accessibles à tous les utilisateurs.',
  created: baseDate,
  updated: baseDate,
  published: baseDate,
  lastPublished: null,
  deleted: null,
  createdById: 'user-1',
  baseId: 'base-1',
  base: mockBase,
  isPublic: true,
  createdBy: mockCreatedBy,
  feedbackAverage: 4.5,
  collections: [
    {
      id: 'collection-resource-1',
      added: new Date('2025-10-22T15:00:00Z'),
      collectionId: 'collection-1',
      collection: mockCollection,
    },
  ],
  contributors: [],
  viewsCount: 123,
  _count: {
    resourceFeedback: 8,
    collections: 3,
  },
  image: { id: 'resource-image', altText: 'Illustration du guide' },
  themes: [Theme.Accessibilite, Theme.IntelligenceArtificielle],
  professionalSectors: [
    ProfessionalSector.ActeursPublics,
    ProfessionalSector.ActeursPrivesEtAssociatifs,
  ],
  source: 'base' as const,
  seen: true,
}

const mockUserNewsFeed = {
  userId: testSessionUser.id,
  created: new Date('2025-10-23'),
  updated: new Date('2025-10-23'),
  themes: [Theme.Accessibilite, Theme.IntelligenceArtificielle],
  professionalSectors: [
    ProfessionalSector.ActeursPublics,
    ProfessionalSector.ActeursPrivesEtAssociatifs,
  ],
  monthlyNewsletter: false,
  lastOpenedAt: new Date('2025-10-23'),
  hasCompleteOnboarding: true,
}

const mockFollowedBases = [
  {
    id: 'follow-1',
    followed: new Date('2025-10-23'),
    base: mockBase,
  },
]

const mockFollowedProfiles = [
  {
    id: 'follow-2',
    followed: new Date('2025-10-23'),
    profile: mockCreatedBy,
  },
]

const mockNewsFeedPageContext: NewsFeedPageContext = {
  user: testSessionUser,
  userNewsFeed: mockUserNewsFeed,
  resources: [],
  followedBases: mockFollowedBases,
  followedProfiles: mockFollowedProfiles,
  resourceCounts: {
    professionalsSectors: {
      [ProfessionalSector.ActeursPublics]: { count: 5 },
      [ProfessionalSector.ActeursPrivesEtAssociatifs]: { count: 3 },
      [ProfessionalSector.AidantsEtMediateursNumeriques]: { count: 2 },
      [ProfessionalSector.AutresProfessionnels]: { count: 1 },
    },
    themes: {
      [Theme.DiagnosticDeCompetencesNumeriques]: { count: 1 },
      [Theme.AidesAuxDemarchesAdministratives]: { count: 2 },
      [Theme.MaitriseDesOutilsNumeriques]: { count: 3 },
      [Theme.NavigationSurInternet]: { count: 1 },
      [Theme.SobrieteNumerique]: { count: 1 },
      [Theme.MaterielReconditionne]: { count: 1 },
      [Theme.Mobilites]: { count: 1 },
      [Theme.Accessibilite]: { count: 5 },
      [Theme.LoisirsEtCreationsNumeriques]: { count: 1 },
      [Theme.CitoyenneteEtEngagement]: { count: 1 },
      [Theme.CodeEtProgrammation]: { count: 1 },
      [Theme.ReseauxSociauxEtCommunication]: { count: 1 },
      [Theme.Donnees]: { count: 1 },
      [Theme.EmploiEtEntrepreunariat]: { count: 1 },
      [Theme.JeuxVideos]: { count: 1 },
      [Theme.NumeriqueEnSante]: { count: 1 },
      [Theme.Parentalite]: { count: 1 },
      [Theme.RisquesCyberEtProtection]: { count: 2 },
      [Theme.CommunsNumeriques]: { count: 1 },
      [Theme.EconomieNumerique]: { count: 1 },
      [Theme.GouvernancesPartagees]: { count: 1 },
      [Theme.IntelligenceArtificielle]: { count: 3 },
      [Theme.OpenSourceEtLicencesLibres]: { count: 1 },
      [Theme.SouveraineteNumeriqueEtHebergementDesDonnees]: { count: 1 },
      [Theme.EcoconceptionDeServicesNumeriques]: { count: 1 },
      [Theme.UsagesResponsablesDuNumerique]: { count: 1 },
      [Theme.NumeriqueAuServiceDeLEnvironnement]: { count: 1 },
      [Theme.TerritoiresConnectesEtDurables]: { count: 1 },
      [Theme.EducationAuxMedias]: { count: 1 },
    },
    followedBases: {},
    followedProfiles: {},
  },
  notificationsCount: { total: 0, count: 0 },
}

const Template = (
  props: ComponentProps<typeof NewsFeedOwnershipInformation>,
) => (
  <div style={{ padding: '16px', background: '#f6f6f6' }}>
    <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
      <NewsFeedOwnershipInformation {...props} />
    </div>
  </div>
)

export const BasePublished: Story = {
  render: () => (
    <Template
      hasFilter={false}
      resource={baseResource}
      newsFeedPageContext={mockNewsFeedPageContext}
    />
  ),
}
BasePublished.storyName = 'Base - Publié'

export const BaseUpdated: Story = {
  render: () => (
    <Template
      hasFilter={false}
      resource={{
        ...baseResource,
        updated: updatedDate,
        lastPublished: updatedDate,
      }}
      newsFeedPageContext={mockNewsFeedPageContext}
    />
  ),
}
BaseUpdated.storyName = 'Base - Mis à jour'

export const ProfilePublished: Story = {
  render: () => (
    <Template
      hasFilter={false}
      resource={{
        ...baseResource,
        base: null,
        baseId: null,
        source: 'profile' as const,
      }}
      newsFeedPageContext={{
        ...mockNewsFeedPageContext,
        followedBases: [],
      }}
    />
  ),
}
ProfilePublished.storyName = 'Profil - Publié'

export const ProfileUpdated: Story = {
  render: () => (
    <Template
      hasFilter={false}
      resource={{
        ...baseResource,
        base: null,
        baseId: null,
        updated: updatedDate,
        lastPublished: updatedDate,
        source: 'profile' as const,
      }}
      newsFeedPageContext={{
        ...mockNewsFeedPageContext,
        followedBases: [],
      }}
    />
  ),
}
ProfileUpdated.storyName = 'Profil - Mis à jour'

export const ThemePublished: Story = {
  render: () => (
    <Template
      hasFilter={false}
      resource={{
        ...baseResource,
        base: null,
        baseId: null,
        source: 'theme' as const,
      }}
      newsFeedPageContext={{
        ...mockNewsFeedPageContext,
        followedBases: [],
        followedProfiles: [],
      }}
    />
  ),
}
ThemePublished.storyName = 'Thématique - Publié'

export const ThemeUpdated: Story = {
  render: () => (
    <Template
      hasFilter={false}
      resource={{
        ...baseResource,
        base: null,
        baseId: null,
        updated: updatedDate,
        lastPublished: updatedDate,
        source: 'theme' as const,
      }}
      newsFeedPageContext={{
        ...mockNewsFeedPageContext,
        followedBases: [],
        followedProfiles: [],
      }}
    />
  ),
}
ThemeUpdated.storyName = 'Thématique - Mis à jour'

export const ProfessionalSectorPublished: Story = {
  render: () => (
    <Template
      hasFilter={false}
      resource={{
        ...baseResource,
        base: null,
        baseId: null,
        themes: [],
        source: 'professional_sector' as const,
      }}
      newsFeedPageContext={{
        ...mockNewsFeedPageContext,
        followedBases: [],
        followedProfiles: [],
        userNewsFeed: {
          ...mockUserNewsFeed,
          themes: [],
        },
      }}
    />
  ),
}
ProfessionalSectorPublished.storyName = 'Secteur pro. - Publié'

export const ProfessionalSectorUpdated: Story = {
  render: () => (
    <Template
      hasFilter={false}
      resource={{
        ...baseResource,
        base: null,
        baseId: null,
        themes: [],
        updated: updatedDate,
        lastPublished: updatedDate,
        source: 'professional_sector' as const,
      }}
      newsFeedPageContext={{
        ...mockNewsFeedPageContext,
        followedBases: [],
        followedProfiles: [],
        userNewsFeed: {
          ...mockUserNewsFeed,
          themes: [],
        },
      }}
    />
  ),
}
ProfessionalSectorUpdated.storyName = 'Secteur pro. - Mis à jour'

export const UnseenResource: Story = {
  render: () => (
    <Template
      hasFilter={false}
      resource={{
        ...baseResource,
        seen: false,
      }}
      newsFeedPageContext={mockNewsFeedPageContext}
    />
  ),
}

UnseenResource.storyName = 'Ressource non vue'

export const SavedCollectionFromBase: Story = {
  render: () => (
    <Template
      hasFilter={false}
      resource={{
        ...baseResource,
        collectionId: 'collection-1',
        addedToCollectionAt: new Date('2025-10-22T15:00:00Z'),
        source: 'savedCollectionFromBase' as const,
      }}
      newsFeedPageContext={mockNewsFeedPageContext}
    />
  ),
}
SavedCollectionFromBase.storyName =
  'Ressource sauvegardé dans collection - Base'

export const SavedCollectionFromProfile: Story = {
  render: () => (
    <Template
      hasFilter={false}
      resource={{
        ...baseResource,
        collectionId: 'collection-1',
        addedToCollectionAt: new Date('2025-10-22T15:00:00Z'),
        source: 'savedCollectionFromProfile' as const,
        collections: [
          {
            id: 'collection-resource-1',
            collectionId: 'collection-1',
            added: new Date('2025-10-22T15:00:00Z'),
            collection: {
              ...mockCollection,
              baseId: null,
              base: null,
            },
          },
        ],
      }}
      newsFeedPageContext={mockNewsFeedPageContext}
    />
  ),
}
SavedCollectionFromProfile.storyName =
  'Ressource sauvegardé dans collection - Profil'

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        padding: '16px',
        background: '#f6f6f6',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div>
        <h3>Priorité base</h3>
        <Template
          hasFilter={false}
          resource={baseResource}
          newsFeedPageContext={mockNewsFeedPageContext}
        />
        <Template
          hasFilter={false}
          resource={{
            ...baseResource,
            updated: updatedDate,
            lastPublished: updatedDate,
          }}
          newsFeedPageContext={mockNewsFeedPageContext}
        />
      </div>

      <div>
        <h3>Priorité profil</h3>
        <Template
          hasFilter={false}
          resource={{
            ...baseResource,
            base: null,
            baseId: null,
            source: 'profile' as const,
          }}
          newsFeedPageContext={{
            ...mockNewsFeedPageContext,
            followedBases: [],
          }}
        />
        <Template
          hasFilter={false}
          resource={{
            ...baseResource,
            base: null,
            baseId: null,
            updated: updatedDate,
            lastPublished: updatedDate,
            source: 'profile' as const,
          }}
          newsFeedPageContext={{
            ...mockNewsFeedPageContext,
            followedBases: [],
          }}
        />
      </div>

      <div>
        <h3>Priorité thématique</h3>
        <Template
          hasFilter={false}
          resource={{
            ...baseResource,
            base: null,
            baseId: null,
            source: 'theme' as const,
          }}
          newsFeedPageContext={{
            ...mockNewsFeedPageContext,
            followedBases: [],
            followedProfiles: [],
          }}
        />
        <Template
          hasFilter={false}
          resource={{
            ...baseResource,
            base: null,
            baseId: null,
            updated: updatedDate,
            lastPublished: updatedDate,
            source: 'theme' as const,
          }}
          newsFeedPageContext={{
            ...mockNewsFeedPageContext,
            followedBases: [],
            followedProfiles: [],
          }}
        />
      </div>

      <div>
        <h3>Priorité secteur pro</h3>
        <Template
          hasFilter={false}
          resource={{
            ...baseResource,
            base: null,
            baseId: null,
            themes: [],
            source: 'professional_sector' as const,
          }}
          newsFeedPageContext={{
            ...mockNewsFeedPageContext,
            followedBases: [],
            followedProfiles: [],
            userNewsFeed: { ...mockUserNewsFeed, themes: [] },
          }}
        />
        <Template
          hasFilter={false}
          resource={{
            ...baseResource,
            base: null,
            baseId: null,
            themes: [],
            updated: updatedDate,
            lastPublished: updatedDate,
            source: 'professional_sector' as const,
          }}
          newsFeedPageContext={{
            ...mockNewsFeedPageContext,
            followedBases: [],
            followedProfiles: [],
            userNewsFeed: { ...mockUserNewsFeed, themes: [] },
          }}
        />
      </div>

      <div>
        <h3>Ressource sauvegardé dans collections</h3>
        <Template
          hasFilter={false}
          resource={{
            ...baseResource,
            collectionId: 'collection-1',
            addedToCollectionAt: new Date('2025-10-22T15:00:00Z'),
            source: 'savedCollectionFromBase' as const,
          }}
          newsFeedPageContext={mockNewsFeedPageContext}
        />
        <Template
          resource={{
            ...baseResource,
            collectionId: 'collection-1',
            addedToCollectionAt: new Date('2025-10-22T15:00:00Z'),
            source: 'savedCollectionFromProfile' as const,
            collections: [
              {
                id: 'collection-resource-1',
                collectionId: 'collection-1',
                added: new Date('2025-10-22T15:00:00Z'),
                collection: {
                  ...mockCollection,
                  baseId: null,
                  base: null,
                },
              },
            ],
          }}
          newsFeedPageContext={mockNewsFeedPageContext}
          hasFilter={false}
        />
      </div>

      <div>
        <h3>Unseen Resource</h3>
        <Template
          resource={{ ...baseResource, seen: false }}
          newsFeedPageContext={mockNewsFeedPageContext}
          hasFilter={false}
        />
      </div>
    </div>
  ),
}

AllVariants.storyName = 'Toutes les variantes par ordre de priorité'

export const Mobile = mobileStory(AllVariants)
Mobile.storyName = 'Mobile - Toutes les variantes'
