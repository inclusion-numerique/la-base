import ResourcePublicStateBadge from '@app/web/app/(public)/ressources/[slug]/_components/ResourcePublicStateBadge'
import type { ResourceForList } from '@app/web/app/administration/ressources/queryResourcesForList'
import type {
  DataTableConfiguration,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import type { Prisma } from '@prisma/client'

export type ResourcesDataTableConfiguration = DataTableConfiguration<
  ResourceForList,
  Prisma.ResourceWhereInput,
  Prisma.ResourceOrderByWithRelationInput
>

export const ResourcesDataTable = {
  csvFilename: () => `les-bases-${dateAsIsoDay(new Date())}-ressources`,
  rowKey: ({ id }) => id,
  rowLink: ({ id }) => ({ href: `/administration/ressources/${id}` }),
  columns: [
    {
      name: 'creation',
      header: 'Date de création',
      csvHeaders: ['Date de création'],
      defaultSortable: true,
      defaultSortableDirection: 'desc',
      csvValues: ({ created }) => [created.toISOString()],
      cell: ({ created }) => dateAsDayAndTime(created),
      orderBy: (direction) => [
        {
          created: direction,
        },
      ],
    },
    {
      name: 'titre',
      header: 'Titre',
      csvHeaders: ['Titre'],
      csvValues: ({ title }) => [title],
      cell: ({ title }) => title,
      orderBy: (direction) => [
        {
          title: direction,
        },
      ],
    },
    {
      name: 'type',
      header: 'Type de ressource',
      csvHeaders: ['Type de ressource'],
      csvValues: ({ isPublic }) => [isPublic ? 'Public' : 'Privé'],
      cell: ({ isPublic, published }) => (
        <ResourcePublicStateBadge resource={{ isPublic, published }} />
      ),
      orderBy: (direction) => [
        {
          isPublic: direction,
        },
      ],
    },
    {
      name: 'auteur',
      header: 'Auteur',
      csvHeaders: ['Auteur'],
      csvValues: ({ createdBy }) => [createdBy.name],
      cell: ({ createdBy }) => createdBy.name,
      orderBy: (direction) => [
        {
          createdBy: { name: direction },
        },
      ],
    },
    {
      name: 'base',
      header: 'Base associée',
      csvHeaders: ['Base associée'],
      csvValues: ({ base }) => [base?.title],
      cell: ({ base }) => base?.title,
      orderBy: (direction) => [
        {
          base: { title: direction },
        },
      ],
    },
  ],
} satisfies ResourcesDataTableConfiguration

export type ResourcesDataTableSearchParams =
  DataTableSearchParams<ResourcesDataTableConfiguration>
