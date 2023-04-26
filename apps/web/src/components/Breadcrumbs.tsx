import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { Route } from 'next'
import { LinkRestProps } from 'next/link'

export type BreadcrumbParent = {
  label: string
  linkProps: Omit<LinkRestProps & { href: Route }, 'children'>
}
export type BreadcrumbParents = BreadcrumbParent[]

export const Breadcrumbs = ({
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
