import classNames from 'classnames'
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

// There is issue with the Link component from nextjs@15, with the scroll restoration not jumping on top while redirecting.
// For now I fallback to a simple <a> tag.
// ref. https://github.com/vercel/next.js/issues/64441
// ref. https://github.com/vercel/next.js/issues/79571
// ref. https://github.com/vercel/next.js/issues/80615
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
            <a
              className="fr-pagination__link fr-pagination__link--first"
              role="link"
              href={createPageLink(1)}
            >
              Première page
            </a>
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
            <a
              className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
              role="link"
              href={createPageLink(pageNumber - 1)}
            >
              Page précédente
            </a>
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
              <a
                className="fr-pagination__link"
                aria-current={pageNumber === linkNumber ? 'page' : undefined}
                title={`Page ${linkNumber}`}
                href={createPageLink(linkNumber)}
              >
                {linkNumber}
              </a>
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
            <a
              className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
              role="link"
              href={createPageLink(pageNumber + 1)}
            >
              Page suivante
            </a>
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
            <a
              className="fr-pagination__link fr-pagination__link--last"
              role="link"
              href={createPageLink(totalPages)}
            >
              Dernière page
            </a>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default PaginationNav
