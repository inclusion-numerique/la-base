'use client'

import CardList from '@app/ui/components/CardList'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { SessionUser } from '@app/web/auth/sessionUser'
import {
  ResourceRoles,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import IconInSquare from '@app/web/components/IconInSquare'
import { CreateResourceButton } from '@app/web/components/Resource/CreateResourceModal'
import DeleteResourceModal from '@app/web/components/Resource/DeleteResource/DeleteResourceModal'
import ResourcesSortingSelect from '@app/web/components/Resource/List/ResourcesSorting'
import ResourceTab from '@app/web/components/Resource/List/ResourceTab'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import ResourcesSearch from '@app/web/components/Resource/ResourcesSearch'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import ShareLinkModal from '@app/web/features/shareableLink/components/ShareLinkModal'
import type { BaseResource } from '@app/web/server/bases/getBase'
import {
  defaultResourcesTab,
  PaginationParams,
  paginationParamsToUrl,
  type ResourcesTab,
} from '@app/web/server/search/searchQueryParams'
import { numberToString } from '@app/web/utils/formatNumber'
import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import { usePathname, useRouter } from 'next/navigation'
import InviteContributorModal from '../Contributors/InviteContributorModal'
import styles from './Resources.module.css'

const tabs = [
  {
    tabId: 'publiques',
    label: 'Publiques',
    iconId: 'fr-icon-earth-line',
    emptyText: "Vous n'avez pas de ressources publiques.",
    'data-testid': 'resources-public-tab',
  },
  {
    tabId: 'privees',
    label: 'Privées',
    iconId: 'fr-icon-lock-line',
    emptyText: "Vous n'avez pas de ressources privées.",
    'data-testid': 'resources-private-tab',
  },
  {
    tabId: 'brouillons',
    label: 'Brouillons',
    iconId: 'fr-icon-draft-line',
    emptyText: "Vous n'avez pas de brouillons.",
    'data-testid': 'resources-draft-tab',
  },
] as const satisfies {
  tabId: ResourcesTab
  label: string
  iconId: string
  emptyText: string
  'data-testid': string
}[]

const Resources = ({
  isOwner = false,
  title,
  resources,
  user,
  canWrite,
  baseId,
  paginationParams,
  slug,
  totalCount,
  tabCounts,
  token,
}: {
  isOwner?: boolean
  title: string
  baseId: string | null
  resources: BaseResource[]
  user: SessionUser | null
  canWrite: boolean
  paginationParams: PaginationParams
  slug: string
  totalCount: number
  tabCounts?: Record<ResourcesTab, number> | null
  token?: string
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const selectedTab =
    tabs.find(
      ({ tabId }) => tabId === (paginationParams.tab ?? defaultResourcesTab),
    ) ?? tabs[0]

  const onTabChange = (tabId: string) => {
    const query = paginationParamsToUrl({
      ...paginationParams,
      tab: tabId as ResourcesTab,
      page: 1,
    })
    router.push(`${pathname}${query ? `?${query}` : ''}`)
  }

  return (
    <div data-testid="resources-list">
      <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-md-reverse fr-mb-md-5w fr-mb-3w fr-flex-gap-4v">
        <div className="fr-col-sm-auto fr-col-12">
          <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
            <IconInSquare iconId="ri-file-text-line" />
            <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
              {title} · {totalCount}&nbsp;
              <span className="fr-sr-only">
                ressource{sPluriel(totalCount)}
              </span>
            </h2>
          </div>
        </div>
        {canWrite && (
          <div
            data-testid="create-resource-button"
            className="fr-col-sm-auto fr-col-12 fr-mt-4w fr-mt-md-0"
          >
            <CreateResourceButton
              titleClassName="fr-text-label--blue-france"
              data-testid={
                baseId ? 'create-resource-in-base-button' : undefined
              }
              className="fr-btn--secondary fr-width-full fr-justify-content-center"
              baseId={baseId}
            />
          </div>
        )}
        {!isOwner && (
          <div className="fr-col-sm-auto fr-col-12">
            <ResourcesSearch initialSearch={paginationParams.search} />
          </div>
        )}
      </div>
      {!isOwner && (
        <div className={styles.header}>
          <p className="fr-text--lg fr-text-–bold fr-mb-0">
            {numberToString(totalCount)} Ressource
            {sPluriel(totalCount)}
          </p>
          <ResourcesSortingSelect
            paginationParams={paginationParams}
            slug={slug}
            baseId={baseId}
          />
        </div>
      )}
      {canWrite && tabCounts ? (
        <Tabs
          selectedTabId={selectedTab.tabId}
          onTabChange={onTabChange}
          tabs={tabs.map(({ tabId, label, iconId }) => ({
            tabId,
            iconId,
            label: (
              <>
                {label} · {tabCounts[tabId]}{' '}
                <span className="fr-sr-only">
                  ressource{sPluriel(tabCounts[tabId])}
                </span>
              </>
            ),
          }))}
        >
          <ResourceTab
            resources={resources}
            user={user}
            emptyText={selectedTab.emptyText}
            data-testid={selectedTab['data-testid']}
            isDraft={selectedTab.tabId === 'brouillons'}
          />
        </Tabs>
      ) : (
        <CardList ariaLabel="Liste des ressources">
          {resources.map((resource) => (
            <ResourceCard
              isContributor={resourceAuthorization(resource, user).hasRole(
                ResourceRoles.ResourceContributor,
              )}
              key={resource.id}
              resource={resource}
              user={user}
              shareToken={token}
            />
          ))}
        </CardList>
      )}
      {!!user && <SaveResourceInCollectionModal user={user} />}
      <DeleteResourceModal />
      <InviteContributorModal />
      <ShareLinkModal />
    </div>
  )
}

export default Resources
