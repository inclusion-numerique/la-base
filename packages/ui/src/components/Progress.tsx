import classNames from 'classnames'
import styles from './Progress.module.css'

const Progress = ({
  progression,
  currentTitle,
  nextTitle,
  steps,
  className,
}: {
  progression: number
  currentTitle: string
  nextTitle?: string
  steps: number
  className?: string
}) => {
  const segmentsList = Array.from({ length: steps })

  return (
    <div className={classNames(styles.container, className)}>
      <p className={styles.progressionInfo}>
        Étape {progression} sur {steps}
      </p>
      <h1 className={styles.currentTitle}>{currentTitle}</h1>
      <div className={styles.bar}>
        {segmentsList.map((_, index) => (
          <div
            key={index}
            className={classNames(
              styles.segment,
              progression > index && styles.filled,
            )}
          />
        ))}
      </div>
      {!!nextTitle && (
        <p className={styles.nextInfo}>
          <span className="fr-text--bold">Étape suivante&nbsp;:</span>{' '}
          {nextTitle}
        </p>
      )}
    </div>
  )
}

export default Progress
