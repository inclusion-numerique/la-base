import type { BaseForList } from '@app/web/app/administration/bases/queryBasesForList'
import { BasePrivacyTag } from '@app/web/components/PrivacyTags'
import type {
  DataTableConfiguration,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { optionalNumberToString } from '@app/web/utils/formatNumber'
import type { Prisma } from '@prisma/client'

export type BasesDataTableConfiguration = DataTableConfiguration<
  BaseForList,
  Prisma.BaseWhereInput,
  Prisma.BaseOrderByWithRelationInput
>

export const BasesDataTable = {
  csvFilename: () => `les bases-${dateAsIsoDay(new Date())}-bases`,
  rowKey: ({ id }) => id,
  rowLink: ({ id }) => ({ href: `/administration/bases/${id}` }),
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
      header: 'Type de base',
      csvHeaders: ['Type de base'],
      csvValues: ({ isPublic }) => [isPublic ? 'Public' : 'Privé'],
      cell: ({ isPublic }) => <BasePrivacyTag isPublic={isPublic} />,
      orderBy: (direction) => [
        {
          isPublic: direction,
        },
      ],
    },
    {
      name: 'collections-count',
      header: 'Collections dans la base',
      csvHeaders: ['Collections dans la base'],
      csvValues: ({ _count: { collections } }) => [collections],
      cell: ({ _count: { collections } }) =>
        optionalNumberToString(collections, null),
      orderBy: (direction) => [
        {
          collections: {
            _count: direction,
          },
        },
      ],
    },
    {
      name: 'resources-count',
      header: 'Ressources dans la base',
      csvHeaders: ['Ressources dans la base'],
      csvValues: ({ _count: { resources } }) => [resources],
      cell: ({ _count: { resources } }) =>
        optionalNumberToString(resources, null),
      orderBy: (direction) => [
        {
          resources: {
            _count: direction,
          },
        },
      ],
    },
    {
      name: 'members-count',
      header: 'Membres dans la base',
      csvHeaders: ['Membres dans la base'],
      csvValues: ({ _count: { members } }) => [members],
      cell: ({ _count: { members } }) => optionalNumberToString(members, null),
      orderBy: (direction) => [
        {
          members: {
            _count: direction,
          },
        },
      ],
    },
    {
      name: 'followed-by',
      header: 'Suivi par',
      csvHeaders: ['Suivi par'],
      csvValues: ({ _count: { followedBy } }) => [followedBy],
      cell: ({ _count: { followedBy } }) =>
        optionalNumberToString(followedBy, null),
      orderBy: (direction) => [
        {
          followedBy: {
            _count: direction,
          },
        },
      ],
    },
  ],
} satisfies BasesDataTableConfiguration

export type BasesDataTableSearchParams =
  DataTableSearchParams<BasesDataTableConfiguration>
