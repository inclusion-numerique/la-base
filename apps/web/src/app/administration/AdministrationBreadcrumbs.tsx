import Breadcrumbs, {
  type BreadcrumbParents,
} from '@app/web/components/Breadcrumbs'

const AdministrationBreadcrumbs = ({
  currentPage,
  parents = [],
  className,
}: {
  currentPage: string
  parents?: BreadcrumbParents
  className?: string
}) => (
  <Breadcrumbs
    currentPage={currentPage}
    parents={parents}
    homeLinkHref="/administration"
    className={className ?? 'fr-mb-4v'}
  />
)

export default AdministrationBreadcrumbs
