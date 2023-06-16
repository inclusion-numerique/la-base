'use client'

import classNames from 'classnames'
import { motion } from 'framer-motion'
import styles from './ProgressBar.module.css'

const ProgressBar = ({
  progress,
  className,
}: {
  progress: number | null
  className?: string
}) => (
  <div className={classNames(styles.bar, className)}>
    <motion.div
      className={styles.progress}
      animate={{
        width: `${progress ?? 0}%`,
        transition: { duration: 0.2 },
      }}
    />
  </div>
)

export default ProgressBar
