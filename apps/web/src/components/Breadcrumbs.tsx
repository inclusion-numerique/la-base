import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import type { Route } from 'next'
import type { LinkProps } from 'next/link'

export type BreadcrumbParent = {
  label: string
  linkProps: Omit<LinkProps & { href: Route }, 'children'>
}
export type BreadcrumbParents = BreadcrumbParent[]

const Breadcrumbs = ({
  currentPage,
  parents = [],
  homeLinkHref,
  className,
}: {
  currentPage: string
  parents?: BreadcrumbParents
  homeLinkHref?: string
  className?: string
}) => (
  <Breadcrumb
    currentPageLabel={currentPage}
    homeLinkProps={{
      href: homeLinkHref ?? '/',
    }}
    segments={parents}
    className={className}
  />
)

export default Breadcrumbs
