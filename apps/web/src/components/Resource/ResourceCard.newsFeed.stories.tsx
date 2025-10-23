import { ResourcesListWrapper } from '@app/storybook/components/ResourcesListWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
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
  title: "Ressource/Cards/Fil d'actualité",
  component: ResourceCard,
} as Meta<typeof ResourceCard>

type Story = StoryObj<typeof ResourceCard>

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
  isPublic: true,
  resourceEvent: [],
  createdResources: [],
  resources: [],
  followedBy: [],
  _count: {
    createdResources: 5,
    resources: 3,
    followedBy: 12,
  },
}

const baseResource: NewsFeedResource = {
  id: 'resource-1',
  title: "Guide pratique de l'accessibilité numérique",
  slug: 'guide-pratique-accessibilite-numerique',
  excerpt:
    'Un guide complet pour rendre vos sites web accessibles à tous les utilisateurs. Ce guide couvre les principales techniques et bonnes pratiques pour créer des interfaces numériques inclusives.',
  created: baseDate,
  updated: baseDate,
  published: baseDate,
  lastPublished: baseDate,
  deleted: null,
  createdById: 'user-1',
  baseId: 'base-1',
  base: mockBase,
  isPublic: true,
  createdBy: mockCreatedBy,
  feedbackAverage: 4.5,
  collections: [],
  contributors: [],
  viewsCount: 123,
  _count: {
    resourceFeedback: 8,
    collections: 3,
  },
  image: {
    id: 'resource-image',
    altText: "Illustration du guide d'accessibilité",
  },
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

const Template = (props: ComponentProps<typeof ResourceCard>) => (
  <ResourcesListWrapper>
    <ResourceCard {...props} />
  </ResourcesListWrapper>
)

export const NewsFeedBasePublished: Story = {
  render: () => (
    <Template
      resource={baseResource}
      user={testSessionUser}
      isContributor={false}
      context="newsFeed"
      withDate={false}
    >
      <NewsFeedOwnershipInformation
        resource={baseResource}
        newsFeedPageContext={mockNewsFeedPageContext}
      />
    </Template>
  ),
}
NewsFeedBasePublished.storyName = 'Base - Publié'

export const NewsFeedBaseUpdated: Story = {
  render: () => (
    <Template
      resource={{
        ...baseResource,
        updated: updatedDate,
        lastPublished: updatedDate,
      }}
      user={testSessionUser}
      isContributor={false}
      context="newsFeed"
      withDate={false}
    >
      <NewsFeedOwnershipInformation
        resource={{
          ...baseResource,
          updated: updatedDate,
          lastPublished: updatedDate,
        }}
        newsFeedPageContext={mockNewsFeedPageContext}
      />
    </Template>
  ),
}
NewsFeedBaseUpdated.storyName = 'Base - Mis à jour'

export const NewsFeedProfilePublished: Story = {
  render: () => (
    <Template
      resource={
        {
          ...baseResource,
          base: null,
          baseId: null,
        } as any
      }
      user={testSessionUser}
      isContributor={false}
      context="newsFeed"
      withDate={false}
    >
      <NewsFeedOwnershipInformation
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
    </Template>
  ),
}
NewsFeedProfilePublished.storyName = 'Profil - Publié'

export const NewsFeedProfileUpdated: Story = {
  render: () => (
    <Template
      resource={
        {
          ...baseResource,
          base: null,
          baseId: null,
          updated: updatedDate,
          lastPublished: updatedDate,
        } as any
      }
      user={testSessionUser}
      isContributor={false}
      context="newsFeed"
      withDate={false}
    >
      <NewsFeedOwnershipInformation
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
    </Template>
  ),
}
NewsFeedProfileUpdated.storyName = 'Profil - Mis à jour'

export const NewsFeedThemePublished: Story = {
  render: () => (
    <Template
      resource={
        {
          ...baseResource,
          base: null,
          baseId: null,
        } as any
      }
      user={testSessionUser}
      isContributor={false}
      context="newsFeed"
      withDate={false}
    >
      <NewsFeedOwnershipInformation
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
    </Template>
  ),
}
NewsFeedThemePublished.storyName = 'Thématique - Publié'

export const NewsFeedProfessionalSectorPublished: Story = {
  render: () => (
    <Template
      resource={
        {
          ...baseResource,
          base: null,
          baseId: null,
        } as any
      }
      user={testSessionUser}
      isContributor={false}
      context="newsFeed"
      withDate={false}
    >
      <NewsFeedOwnershipInformation
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
    </Template>
  ),
}
NewsFeedProfessionalSectorPublished.storyName = 'Secteur pro. - Publié'

export const NewsFeedUnseenResource: Story = {
  render: () => (
    <Template
      resource={
        {
          ...baseResource,
        } as any
      }
      user={testSessionUser}
      isContributor={false}
      context="newsFeed"
      withDate={false}
    >
      <NewsFeedOwnershipInformation
        resource={{
          ...baseResource,
          seen: false,
        }}
        newsFeedPageContext={mockNewsFeedPageContext}
      />
    </Template>
  ),
}
NewsFeedUnseenResource.storyName = 'Ressource non vue'

export const NewsFeedContributorResource: Story = {
  render: () => (
    <Template
      resource={{
        ...baseResource,
        createdById: testSessionUser.id,
        createdBy: {
          ...mockCreatedBy,
          id: testSessionUser.id,
          name: testSessionUser.name,
          firstName: testSessionUser.firstName,
          lastName: testSessionUser.lastName,
          email: testSessionUser.email,
        },
      }}
      user={testSessionUser}
      isContributor={true}
      context="newsFeed"
      withDate={false}
    >
      <NewsFeedOwnershipInformation
        resource={{
          ...baseResource,
          createdById: testSessionUser.id,
          createdBy: {
            ...mockCreatedBy,
            id: testSessionUser.id,
            name: testSessionUser.name,
            firstName: testSessionUser.firstName,
            lastName: testSessionUser.lastName,
            email: testSessionUser.email,
          },
        }}
        newsFeedPageContext={mockNewsFeedPageContext}
      />
    </Template>
  ),
}
NewsFeedContributorResource.storyName = 'Ressource - vue contributeur'

export const AllNewsFeedVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>Priorité base (Publié)</h3>
      <Template
        resource={baseResource}
        user={testSessionUser}
        isContributor={false}
        context="newsFeed"
        withDate={false}
      >
        <NewsFeedOwnershipInformation
          resource={baseResource}
          newsFeedPageContext={mockNewsFeedPageContext}
        />
      </Template>

      <h3>Priorité base (Mis à jour)</h3>
      <Template
        resource={{
          ...baseResource,
          updated: updatedDate,
          lastPublished: updatedDate,
        }}
        user={testSessionUser}
        isContributor={false}
        context="newsFeed"
        withDate={false}
      >
        <NewsFeedOwnershipInformation
          resource={{
            ...baseResource,
            updated: updatedDate,
            lastPublished: updatedDate,
          }}
          newsFeedPageContext={mockNewsFeedPageContext}
        />
      </Template>

      <h3>Priorité profil (Publié)</h3>
      <Template
        resource={
          {
            ...baseResource,
            base: null,
            baseId: null,
          } as any
        }
        user={testSessionUser}
        isContributor={false}
        context="newsFeed"
        withDate={false}
      >
        <NewsFeedOwnershipInformation
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
      </Template>

      <h3>Ressource non vue</h3>
      <Template
        resource={
          {
            ...baseResource,
          } as any
        }
        user={testSessionUser}
        isContributor={false}
        context="newsFeed"
        withDate={false}
      >
        <NewsFeedOwnershipInformation
          resource={{
            ...baseResource,
            seen: false,
          }}
          newsFeedPageContext={mockNewsFeedPageContext}
        />
      </Template>
    </div>
  ),
}
AllNewsFeedVariants.storyName = "Toutes les variantes - Fil d'actualité"

export const Mobile = mobileStory(AllNewsFeedVariants)
Mobile.storyName = "Mobile - Fil d'actualité"
