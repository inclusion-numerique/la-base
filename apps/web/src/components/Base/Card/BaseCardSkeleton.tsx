import classNames from 'classnames'
import cardStyles from './BaseCard.module.css'

const BaseSkeleton = ({ compact = false }: { compact?: boolean }) => (
  <article className={cardStyles.container} data-testid="base-skeleton">
    <span
      className={classNames(
        'skeleton-quarter',
        compact ? 'skeleton--48' : 'skeleton--96',
      )}
    />
    <div className={cardStyles.content}>
      <div className="skeleton-rectangle skeleton-rectangle--120" />
      {!compact && (
        <>
          <div className="fr-mt-6v skeleton-rectangle skeleton-rectangle--480" />
          <div className="fr-mb-2w fr-mt-2v skeleton-rectangle skeleton-rectangle--480" />
        </>
      )}
      <div className="fr-mt-4v skeleton-rectangle skeleton-rectangle--240" />
    </div>
  </article>
)

export default BaseSkeleton
