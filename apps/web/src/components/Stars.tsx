import classNames from 'classnames'

const Stars = ({
  count,
  className,
  max,
}: {
  count: number
  className?: string
  max?: number
}) => (
  <div
    className={classNames(
      'fr-text-title--blue-france fr-flex fr-flex-nowrap',
      className,
    )}
  >
    {Array.from({ length: count }).map((_, index) => (
      <span
        key={
          // eslint-disable-next-line react/no-array-index-key
          index
        }
        className={classNames(
          'fr-icon-star-fill fr-icon--sm',
          index !== 0 && 'fr-ml-1v',
        )}
      />
    ))}
    {max && count < max
      ? Array.from({ length: max - count }).map((_, index) => (
          <span
            key={
              // eslint-disable-next-line react/no-array-index-key
              `placeholder_${index}`
            }
            className={classNames(
              'fr-icon-star-line fr-icon--sm',
              (count > 0 || index !== 0) && 'fr-ml-1v',
            )}
          />
        ))
      : null}
  </div>
)

export default Stars
