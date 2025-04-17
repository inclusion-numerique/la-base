import { notFound } from 'next/navigation'
import Link from 'next/link'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { prismaClient } from '@app/web/prismaClient'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import DeleteBaseButton from '@app/web/app/administration/bases/[id]/DeleteBaseButton'
import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import { BasePrivacyTag } from '@app/web/components/PrivacyTags'
import AdministrationInlineLabelsValues from '@app/web/app/administration/AdministrationInlineLabelsValues'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { dateAsDay } from '@app/web/utils/dateAsDay'

export const metadata = {
  title: metadataTitle('Bases - Détails'),
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const AdministrationBaseDetailsPage = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const base = await prismaClient.base.findUnique({
    where: {
      id,
    },
    select: {
      members: {
        where: {
          accepted: { not: null },
          member: { deleted: null },
        },
        select: {
          accepted: true,
          member: {
            select: {
              slug: true,
              name: true,
            },
          },
        },
      },
      collections: {
        select: {
          slug: true,
          title: true,
        },
      },
      createdBy: { select: { name: true, slug: true } },
      isPublic: true,
      title: true,
      description: true,
      created: true,
      slug: true,
    },
  })

  if (!base) {
    notFound()
  }

  const [collectionsCount, resourcesCount, membersCount, followedByCount] =
    await Promise.all([
      prismaClient.collection.count({
        where: { baseId: id, deleted: null },
      }),
      prismaClient.resource.count({
        where: {
          baseId: id,
          deleted: null,
          lastPublished: { not: null },
        },
      }),
      prismaClient.baseMembers.count({
        where: { baseId: id, accepted: { not: null } },
      }),
      prismaClient.baseFollow.count({
        where: { baseId: id, follower: { deleted: null } },
      }),
    ])

  const profileUrl = getServerUrl(`/profils/${base.createdBy.slug}`)
  const baseUrl = getServerUrl(`/bases/${base.slug}`)

  return (
    <>
      <AdministrationPageContainer size="full">
        <AdministrationBreadcrumbs
          currentPage={base.title}
          parents={[
            {
              label: 'Bases',
              linkProps: { href: '/administration/bases' },
            },
          ]}
        />
        <AdministrationTitle
          icon="ri-stack-line"
          actions={<DeleteBaseButton baseId={id} />}
        >
          {base.title}
        </AdministrationTitle>
        <AdministrationInfoCard title="Détails de la base">
          <BasePrivacyTag isPublic={base.isPublic} />
          <AdministrationInlineLabelsValues
            className="fr-mt-4v"
            items={[
              {
                label: 'Id',
                value: id,
              },
              {
                label: 'Titre',
                value: base.title,
              },
              ...(base.description
                ? [
                    {
                      label: 'Description',
                      value: (
                        <div
                          className="fr-text--sm fr-mb-3v fr-text-mention--grey"
                          dangerouslySetInnerHTML={{
                            __html: base.description,
                          }}
                        />
                      ),
                    },
                  ]
                : []),
              {
                label: 'Lien vers la base',
                value: (
                  <Link
                    href={`/bases/${base.slug}`}
                    className="fr-link"
                    target="_blank"
                  >
                    {baseUrl}
                  </Link>
                ),
              },
              {
                label: 'Nombre de collections',
                value: collectionsCount,
              },
              {
                label: 'Nombre de ressources',
                value: resourcesCount,
              },
              {
                label: 'Nombre de membres',
                value: membersCount,
              },
              {
                label: 'Nombre de followers',
                value: followedByCount,
              },
              {
                label: 'Créée le',
                value: dateAsDay(base.created),
              },
            ]}
          />
        </AdministrationInfoCard>
      </AdministrationPageContainer>
      <AdministrationPageContainer>
        <AdministrationInfoCard title="Créateur">
          <AdministrationInlineLabelsValues
            items={[
              {
                label: 'Nom',
                value: base.createdBy.name,
              },
              {
                label: 'Lien vers le profil',
                value: (
                  <Link
                    href={`/profils/${base.createdBy.slug}`}
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
        {collectionsCount > 0 && (
          <AdministrationInfoCard title="Collections associées">
            <AdministrationInlineLabelsValues
              items={base.collections.map((baseCollection) => ({
                label: baseCollection.title,
                value: (
                  <Link
                    href={`/collections/${baseCollection.slug}`}
                    className="fr-link"
                    target="_blank"
                  >
                    {getServerUrl(`/collections/${baseCollection.slug}`)}
                  </Link>
                ),
              }))}
            />
          </AdministrationInfoCard>
        )}
        {membersCount > 0 && (
          <AdministrationInfoCard title="Membres">
            <AdministrationInlineLabelsValues
              items={base.members.map((baseMember) => ({
                label: dateAsDay(baseMember.accepted),
                value: (
                  <Link
                    href={`/profils/${baseMember.member.slug}`}
                    className="fr-link"
                    target="_blank"
                  >
                    {baseMember.member.name}
                  </Link>
                ),
              }))}
            />
          </AdministrationInfoCard>
        )}
      </AdministrationPageContainer>
    </>
  )
}

export default AdministrationBaseDetailsPage
