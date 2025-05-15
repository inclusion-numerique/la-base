import {
  type CreateDataTableHrefParams,
  createDataTableHref,
} from '@app/web/data-table/createDataTableHref'
import classNames from 'classnames'
import Link from 'next/link'

// Only display at most 6 pages numbered links
/**
 * A string return type means that no pageNumber is to display.
 * These are unique string so they can be used as "key" props in iterators.
 */
export const createPagesNumbersToDisplay = (
  totalPages: number,
  pageNumber: number,
): (number | string)[] => {
  // Small pages numbers, display all pages
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }).map((_, index) => index + 1)
  }

  // Page is at beginning or end of the list, only display one "..."
  if (pageNumber <= 3 || pageNumber >= totalPages - 2) {
    return [1, 2, 3, 'separator', totalPages - 2, totalPages - 1, totalPages]
  }

  // Page is in the middle, display it inside separators
  return [
    1,
    'separator1',
    pageNumber - 1,
    pageNumber,
    pageNumber + 1,
    'separator2',
    totalPages,
  ]
}

export type PaginationNavProps = {
  className?: string
  totalPages: number
} & CreateDataTableHrefParams

const PaginationNav = ({
  className,
  baseHref,
  searchParams,
  totalPages,
}: PaginationNavProps) => {
  const pageNumber = searchParams.page
    ? Number.parseInt(searchParams.page, 10)
    : 1

  const isFirstPage = pageNumber <= 1
  const isLastPage = pageNumber >= totalPages

  const linkablePages = createPagesNumbersToDisplay(totalPages, pageNumber)

  const createPageHref = (page: number) =>
    createDataTableHref({
      baseHref,
      searchParams: {
        ...searchParams,
        page: page.toString(10),
      },
    })

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={classNames('fr-pagination fr-flex', className)}
    >
      <ul className="fr-pagination__list">
        <li>
          {isFirstPage ? (
            <a
              className="fr-pagination__link fr-pagination__link--first"
              aria-disabled="true"
            >
              Première page
            </a>
          ) : (
            <Link
              className="fr-pagination__link fr-pagination__link--first"
              role="link"
              href={createPageHref(1)}
              prefetch={false}
            >
              Première page
            </Link>
          )}
        </li>
        <li>
          {isFirstPage ? (
            <a
              className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
              aria-disabled="true"
            >
              Précédent
            </a>
          ) : (
            <Link
              className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
              role="link"
              href={createPageHref(pageNumber - 1)}
              prefetch={false}
            >
              Précédent
            </Link>
          )}
        </li>
        {/* TODO display lg etc... from doc https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/pagination/ */}
        {linkablePages.map((linkNumber) =>
          typeof linkNumber === 'string' ? (
            <li key={linkNumber}>
              <a className="fr-pagination__link">...</a>
            </li>
          ) : (
            <li key={linkNumber}>
              <Link
                className="fr-pagination__link"
                aria-current={pageNumber === linkNumber ? 'page' : undefined}
                title={`Page ${linkNumber}`}
                href={createPageHref(linkNumber)}
                prefetch={false}
              >
                {linkNumber}
              </Link>
            </li>
          ),
        )}
        <li>
          {isLastPage ? (
            <a
              className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
              aria-disabled="true"
            >
              Suivant
            </a>
          ) : (
            <Link
              className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
              role="link"
              href={createPageHref(pageNumber + 1)}
              prefetch={false}
            >
              Suivant
            </Link>
          )}
        </li>
        <li>
          {isLastPage ? (
            <a
              className="fr-pagination__link fr-pagination__link--last"
              aria-disabled="true"
            >
              Dernière page
            </a>
          ) : (
            <Link
              className="fr-pagination__link fr-pagination__link--last"
              role="link"
              href={createPageHref(totalPages)}
              prefetch={false}
            >
              Dernière page
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default PaginationNav
