import type { UtilisateurForList } from '@app/web/app/administration/utilisateurs/queryUtilisateursForList'
import CopyToClipboardButton from '@app/web/components/CopyToClipboardButton'
import type {
  DataTableConfiguration,
  DataTableFilterValues,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { optionalNumberToString } from '@app/web/utils/formatNumber'
import type { Prisma } from '@prisma/client'

export type UtilisateursDataTableConfiguration = DataTableConfiguration<
  UtilisateurForList,
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithRelationInput
>

export const UtilisateursDataTable = {
  csvFilename: () => `les-bases-${dateAsIsoDay(new Date())}-utilisateurs`,
  rowKey: ({ id }) => id,
  rowLink: ({ id }) => ({ href: `/administration/utilisateurs/${id}` }),
  columns: [
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
    {
      name: 'nom',
      header: 'Nom',
      csvHeaders: ['Nom'],
      csvValues: ({ name }) => [name],
      cell: ({ name }) => name,
      orderBy: (direction) => [
        {
          lastName: direction,
        },
      ],
    },
    {
      name: 'email',
      header: 'Email',
      csvHeaders: ['Email'],
      csvValues: ({ email }) => [email],
      cell: ({ email }) => (
        <div className="fr-position-relative fr-pl-11v">
          {email}
          <CopyToClipboardButton
            size="small"
            value={email}
            style={{ zIndex: 10, position: 'absolute', left: 0 }}
          />
        </div>
      ),
      orderBy: (direction) => [
        {
          email: direction,
        },
      ],
    },
    {
      name: 'created-resources',
      header: 'Ressources créées',
      csvHeaders: ['Ressources créées'],
      csvValues: ({ _count: { createdResources } }) => [createdResources],
      cell: ({ _count: { createdResources } }) =>
        optionalNumberToString(createdResources, null),
      orderBy: (direction) => [
        {
          createdResources: { _count: direction },
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
          followedBy: { _count: direction },
        },
      ],
    },
  ],
} satisfies UtilisateursDataTableConfiguration

export type UtilisateursDataTableSearchParams =
  DataTableSearchParams<UtilisateursDataTableConfiguration>

export type UtilisateursDataTableFilterValues =
  DataTableFilterValues<UtilisateursDataTableConfiguration>
