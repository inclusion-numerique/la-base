import classNames from 'classnames'
import Link from 'next/link'
import type { ComponentProps } from 'react'

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

export type PaginationNavProps = ComponentProps<typeof PaginationNav>

const PaginationNav = ({
  className,
  createPageLink,
  totalPages,
  pageNumber,
}: {
  className?: string
  pageNumber: number
  totalPages: number
  createPageLink: (pageNumber: number) => string
}) => {
  const isFirstPage = pageNumber <= 1
  const isLastPage = pageNumber >= totalPages

  const linkablePages = createPagesNumbersToDisplay(totalPages, pageNumber)

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={classNames(
        'fr-pagination fr-flex fr-justify-content-center',
        className,
      )}
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
              href={createPageLink(1)}
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
              Page précédente
            </a>
          ) : (
            <Link
              className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
              role="link"
              href={createPageLink(pageNumber - 1)}
              prefetch={false}
            >
              Page précédente
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
                href={createPageLink(linkNumber)}
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
              Page suivante
            </a>
          ) : (
            <Link
              className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
              role="link"
              href={createPageLink(pageNumber + 1)}
              prefetch={false}
            >
              Page suivante
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
              href={createPageLink(totalPages)}
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
