import type { NewsFeedForList } from '@app/web/app/administration/fonctionnalites/fil-d-actualite/queryNewsFeedsForList'
import CopyToClipboardButton from '@app/web/components/CopyToClipboardButton'
import type {
  DataTableConfiguration,
  DataTableFilterValues,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import Badge from '@codegouvfr/react-dsfr/Badge'
import type { Prisma } from '@prisma/client'

export type NewsFeedDataTableConfiguration = DataTableConfiguration<
  NewsFeedForList,
  Prisma.NewsFeedWhereInput,
  Prisma.NewsFeedOrderByWithRelationInput
>

export const NewsFeedDataTable = {
  csvFilename: () => `les-bases-${dateAsIsoDay(new Date())}-fil-d-actualite`,
  rowKey: ({ userId }) => userId,
  rowLink: ({ userId }) => ({
    href: `/administration/fonctionnalites/fil-d-actualite/${userId}`,
  }),
  columns: [
    {
      name: 'nom',
      header: 'Nom',
      csvHeaders: ['Nom'],
      csvValues: ({ user }) => [user.name ?? ''],
      cell: ({ user }) => user.name,
      orderBy: (direction) => [
        {
          user: { lastName: direction },
        },
      ],
    },
    {
      name: 'email',
      header: 'Email',
      csvHeaders: ['Email'],
      csvValues: ({ user }) => [user.email],
      cell: ({ user }) => (
        <div className="fr-position-relative fr-pl-11v">
          {user.email}
          <CopyToClipboardButton
            size="small"
            value={user.email}
            style={{ zIndex: 10, position: 'absolute', left: 0 }}
          />
        </div>
      ),
      orderBy: (direction) => [
        {
          user: { email: direction },
        },
      ],
    },
    {
      name: 'newsletter',
      header: 'Newsletter',
      csvHeaders: ['Newsletter'],
      csvValues: ({ monthlyNewsletter }) => [monthlyNewsletter ? 'Oui' : 'Non'],
      cell: ({ monthlyNewsletter }) => (
        <Badge severity={monthlyNewsletter ? 'success' : 'warning'} small>
          {monthlyNewsletter ? 'Oui' : 'Non'}
        </Badge>
      ),
      orderBy: (direction) => [
        {
          monthlyNewsletter: direction,
        },
      ],
    },
    {
      name: 'onboarding',
      header: 'Onboarding',
      csvHeaders: ['Onboarding complété'],
      csvValues: ({ hasCompleteOnboarding }) => [
        hasCompleteOnboarding ? 'Oui' : 'Non',
      ],
      cell: ({ hasCompleteOnboarding }) => (
        <Badge severity={hasCompleteOnboarding ? 'success' : 'warning'} small>
          {hasCompleteOnboarding ? 'Oui' : 'Non'}
        </Badge>
      ),
      orderBy: (direction) => [
        {
          hasCompleteOnboarding: direction,
        },
      ],
    },
    {
      name: 'themes',
      header: 'Thèmes',
      csvHeaders: ['Nb thèmes'],
      csvValues: ({ themes }) => [themes.length],
      cell: ({ themes }) => themes.length > 0 || null,
    },
    {
      name: 'secteurs',
      header: 'Secteurs',
      csvHeaders: ['Nb secteurs'],
      csvValues: ({ professionalSectors }) => [professionalSectors.length],
      cell: ({ professionalSectors }) => professionalSectors.length > 0 || null,
    },
    {
      name: 'derniere-ouverture',
      header: 'Dernière ouverture',
      csvHeaders: ['Dernière ouverture'],
      csvValues: ({ lastOpenedAt }) => [lastOpenedAt?.toISOString() ?? ''],
      cell: ({ lastOpenedAt }) =>
        lastOpenedAt ? dateAsDayAndTime(lastOpenedAt) : 'Jamais',
      orderBy: (direction) => [
        {
          lastOpenedAt: direction,
        },
      ],
    },
    {
      name: 'creation',
      header: 'Créé',
      csvHeaders: ['Créé'],
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
  ],
} satisfies NewsFeedDataTableConfiguration

export type NewsFeedDataTableSearchParams =
  DataTableSearchParams<NewsFeedDataTableConfiguration>

export type NewsFeedDataTableFilterValues =
  DataTableFilterValues<NewsFeedDataTableConfiguration>
