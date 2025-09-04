import { createSortLinkProps } from '@app/web/data-table/createSortLinkProps'
import type {
  DataTableConfiguration,
  DataTableRow,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import SortLink from '@app/web/data-table/SortLink'
import classNames from 'classnames'
import Link from 'next/link'
import { type ComponentType } from 'react'
import styles from './DataTable.module.css'

export type DataTableClasses = {
  wrapper?: string
  container?: string
  content?: string
  table?: string
  thead?: string
  th?: string
  tbody?: string
  tr?: string
}

const DataTable = <
  Data extends DataTableRow,
  Configuration extends DataTableConfiguration<Data>,
>({
  configuration,
  rows,
  className,
  classes,
  searchParams,
  baseHref,
  rowButtonComponent: RowButtonComponent,
}: {
  rows: Data[]
  configuration: Configuration
  className?: string
  classes?: DataTableClasses
  searchParams: DataTableSearchParams<Configuration>
  baseHref: string
  rowButtonComponent?: ComponentType<{ row: Data }>
}) => {
  const sortLinkProps = (
    sortParams: DataTableSearchParams<Configuration>,
    isDefault = false,
    defaultSortableDirection?: 'asc' | 'desc',
  ) =>
    createSortLinkProps({
      searchParams,
      sortParams,
      isDefault,
      defaultSortableDirection,
      baseHref,
    })

  return (
    <div className={classNames('fr-table', className)} data-fr-js-table="true">
      <div className={classNames('fr-table__wrapper', classes?.wrapper)}>
        <div className={classNames('fr-table__container', classes?.container)}>
          <div className={classNames('fr-table__content', classes?.content)}>
            <table
              className={classNames(classes?.table)}
              data-fr-js-table-element="true"
            >
              <thead className={classNames(classes?.thead)}>
                <tr className={classNames(classes?.tr)}>
                  {configuration.columns.map(
                    ({
                      name,
                      header,
                      sortInMemory,
                      sortable,
                      defaultSortable,
                      defaultSortableDirection,
                      headerClassName,
                      orderBy,
                    }) => (
                      <th
                        scope="col"
                        key={name}
                        className={classNames(headerClassName, classes?.th)}
                      >
                        {header}
                        {(!!defaultSortable ||
                          !!sortable ||
                          !!sortInMemory ||
                          !!orderBy) && (
                          <SortLink
                            {...sortLinkProps(
                              {
                                tri: name,
                              } as DataTableSearchParams<Configuration>,
                              defaultSortable,
                              defaultSortableDirection,
                            )}
                          />
                        )}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className={classNames(classes?.tbody)}>
                {rows.map((row) => (
                  <tr
                    key={configuration.rowKey(row)}
                    className={classNames(
                      classes?.tr,
                      !!configuration.rowLink && 'fr-enlarge-link',
                      !!configuration.rowLink && styles.rowWithLink,
                      !!RowButtonComponent && 'fr-enlarge-button',
                      !!RowButtonComponent && styles.rowWithButton,
                    )}
                  >
                    {configuration.columns.map(
                      ({ name, cellAsTh, cell, cellClassName }) => {
                        if (!cell) {
                          return null
                        }
                        const Component = cellAsTh ? 'th' : 'td'

                        return (
                          <Component
                            className={classNames(styles.cell, cellClassName)}
                            key={name}
                          >
                            {cell(row)}
                          </Component>
                        )
                      },
                    )}
                    {!!configuration.rowLink && (
                      <td className={styles.rowLinkCell}>
                        <Link {...configuration.rowLink(row)} />
                      </td>
                    )}
                    {!!RowButtonComponent && (
                      <td className={styles.rowButtonCell}>
                        <RowButtonComponent row={row} />
                      </td>
                    )}
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={configuration.columns.length}>
                      Aucun résultat
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable
