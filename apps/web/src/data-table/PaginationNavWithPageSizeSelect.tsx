import type { SelectOption } from '@app/ui/components/Form/utils/options'
import PageSizeSelect from '@app/web/data-table/PageSizeSelect'
import PaginationNav, {
  type PaginationNavProps,
} from '@app/web/data-table/PaginationNav'
import classNames from 'classnames'

export type PaginationNavWithPageSizeProps = PaginationNavProps & {
  pageSizeOptions: SelectOption[]
  defaultPageSize: number
}

const PaginationNavWithPageSizeSelect = ({
  className,
  ...paginationProps
}: PaginationNavWithPageSizeProps) => (
  <div
    className={classNames(
      'fr-flex fr-width-full fr-justify-content-space-between fr-align-items-center',
      className,
    )}
  >
    <PageSizeSelect {...paginationProps} />
    <PaginationNav
      {...paginationProps}
      className="fr-flex-grow-1 fr-justify-content-end"
    />
  </div>
)

export default PaginationNavWithPageSizeSelect
