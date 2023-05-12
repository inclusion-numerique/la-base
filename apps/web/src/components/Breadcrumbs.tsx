import { Route } from 'next'
import { LinkProps } from 'next/link'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'

export type BreadcrumbParent = {
  label: string
  linkProps: Omit<LinkProps & { href: Route }, 'children'>
}
export type BreadcrumbParents = BreadcrumbParent[]

const Breadcrumbs = ({
  currentPage,
  parents = [],
}: {
  currentPage: string
  parents?: BreadcrumbParents
}) => (
  <Breadcrumb
    currentPageLabel={currentPage}
    homeLinkProps={{
      href: '/',
    }}
    segments={parents}
  />
)

export default Breadcrumbs
