import { notFound } from 'next/navigation'
import Link from 'next/link'
import classNames from 'classnames'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { prismaClient } from '@app/web/prismaClient'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import DeleteResourceButton from '@app/web/app/administration/ressources/[id]/DeleteResourceButton'
import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import ResourcePublicStateBadge from '@app/web/app/(public)/ressources/[slug]/_components/ResourcePublicStateBadge'
import AdministrationInlineLabelsValues from '@app/web/app/administration/AdministrationInlineLabelsValues'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { dateAsDay } from '@app/web/utils/dateAsDay'

export const metadata = {
  title: metadataTitle('Ressources - Détails'),
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const AdministrationRessourceDetailsPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const resource = await prismaClient.resource.findUnique({
    where: {
      id,
    },
    include: {
      createdBy: true,
      base: true,
      views: true,
      contributors: { include: { contributor: true } },
      collections: { include: { collection: true } },
    },
  })

  if (!resource) {
    notFound()
  }
  const profileUrl = getServerUrl(`/profils/${resource.createdBy.slug}`)
  const resourceUrl = getServerUrl(`/ressources/${resource.slug}`)

  // Get counts using Prisma
  const [viewsCount, collectionsCount, contributorsCount] = await Promise.all([
    prismaClient.resourceView.count({
      where: { resourceId: id },
    }),
    prismaClient.collectionResource.count({
      where: { resourceId: id },
    }),
    prismaClient.resourceContributors.count({
      where: { resourceId: id },
    }),
  ])

  return (
    <AdministrationPageContainer>
      <AdministrationBreadcrumbs
        currentPage={resource.title}
        parents={[
          {
            label: 'Ressources',
            linkProps: { href: '/administration/ressources' },
          },
        ]}
      />
      <AdministrationTitle
        icon="ri-article-line"
        actions={<DeleteResourceButton resourceId={id} />}
      >
        {resource.title}
      </AdministrationTitle>
      <AdministrationInfoCard title="Détails de la ressource">
        <ResourcePublicStateBadge
          resource={{
            isPublic: resource.isPublic,
            published: resource.published,
          }}
        />
        <AdministrationInlineLabelsValues
          className="fr-mt-4v"
          items={[
            {
              label: 'Id',
              value: id,
            },
            {
              label: 'Titre',
              value: resource.title,
            },
            {
              label: 'Description',
              value: resource.description,
            },
            {
              label: 'Lien vers la ressource',
              value: (
                <Link
                  href={`/ressource/${resource.slug}`}
                  className="fr-link"
                  target="_blank"
                >
                  {resourceUrl}
                </Link>
              ),
            },
            {
              label: 'Nombre de vues',
              value: viewsCount,
            },
            {
              label: "Nombre d'enregistrements",
              value: collectionsCount,
            },
            {
              label: 'Créée le',
              value: dateAsDay(resource.created),
            },
            resource.published && {
              label: 'Publiée le',
              value: dateAsDay(resource.published),
            },
          ]}
        />
      </AdministrationInfoCard>
      <div
        className={classNames(resource.base ? 'fr-flex fr-flex-gap-2v' : '')}
      >
        <AdministrationInfoCard title="Profil associé">
          <AdministrationInlineLabelsValues
            items={[
              {
                label: 'Nom',
                value: resource.createdBy.name,
              },
              {
                label: 'Lien vers le profil',
                value: (
                  <Link
                    href={`/profils/${resource.createdBy.slug}`}
                    className="fr-link"
                    target="_blank"
                  >
                    {profileUrl}
                  </Link>
                ),
              },
            ]}
          />
        </AdministrationInfoCard>
        {resource.base && (
          <AdministrationInfoCard title="Base associée">
            <AdministrationInlineLabelsValues
              items={[
                {
                  label: 'Nom',
                  value: resource.base.title,
                },
                {
                  label: 'Lien vers la base',
                  value: (
                    <Link
                      href={`/bases/${resource.base.slug}`}
                      className="fr-link"
                      target="_blank"
                    >
                      {getServerUrl(`/bases/${resource.base.slug}`)}
                    </Link>
                  ),
                },
              ]}
            />
          </AdministrationInfoCard>
        )}
      </div>
      <div
        className={classNames(
          collectionsCount > 0 && contributorsCount > 0
            ? 'fr-flex fr-flex-gap-2v'
            : '',
        )}
      >
        {collectionsCount > 0 && (
          <AdministrationInfoCard title="Collections associées">
            <AdministrationInlineLabelsValues
              items={resource.collections.map((collection) => ({
                label: dateAsDay(collection.added),
                value: (
                  <Link
                    href={`/collections/${collection.collection.slug}`}
                    className="fr-link"
                    target="_blank"
                  >
                    {collection.collection.title}
                  </Link>
                ),
              }))}
            />
          </AdministrationInfoCard>
        )}
        {contributorsCount > 0 && (
          <AdministrationInfoCard title="Contributeurs">
            <AdministrationInlineLabelsValues
              items={resource.contributors.map((contributor) => ({
                label: dateAsDay(contributor.added),
                value: (
                  <Link
                    href={`/profils/${contributor.contributor.slug}`}
                    className="fr-link"
                    target="_blank"
                  >
                    {contributor.contributor.name}
                  </Link>
                ),
              }))}
            />
          </AdministrationInfoCard>
        )}
      </div>
    </AdministrationPageContainer>
  )
}

export default AdministrationRessourceDetailsPage
