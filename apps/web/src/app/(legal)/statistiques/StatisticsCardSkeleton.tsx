import { Spinner } from '@app/web/ui/Spinner'
import classNames from 'classnames'

export const StatisticsCardSkeleton = ({
  className,
}: {
  className?: string
}) => {
  return (
    <div
      className={classNames(
        className,
        'fr-flex fr-justify-content-center fr-align-items-center fr-border fr-border-radius--8 fr-background-alt--blue-cumulus',
      )}
    >
      <Spinner />
    </div>
  )
}
