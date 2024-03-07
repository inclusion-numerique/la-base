'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const colors = [
  'fr-highlight--green-bourgeon',
  'fr-highlight--blue-ecume',
  'fr-highlight--purple-glycine',
  'fr-highlight--pink-macaron',
  'fr-highlight--yellow-tournesol',
  'fr-highlight--orange-terre-battue',
  'fr-highlight--brown-cafe-creme',
  'fr-highlight--beige-gris-galet',
  'fr-highlight--green-emeraude',
  'fr-highlight--blue-cumulus',
  'fr-highlight--green-archipel',
  'fr-highlight--green-tilleul-verveine',
  'fr-highlight--brown-opera',
  'fr-highlight--pink-tuile',
  'fr-highlight--beige-gris-galet',
  'fr-highlight--yellow-moutarde',
  'fr-highlight--brown-caramel',
  'fr-highlight--green-menthe',
]

const ProgressBar = ({
  progress,
  displayProgress = false,
  min = 0,
  max = 100,
  ariaLabel,
  title,
  value,
  size = 'medium',
  colorIndex,
  className,
}: {
  progress?: number | null
  displayProgress?: boolean
  min?: number
  max?: number
  ariaLabel: string
  title?: ReactNode
  value?: number
  size?: 'medium' | 'small'
  colorIndex?: number
  className?: string
}) => (
  <div className={className}>
    <div
      className={`fr-progress fr-mb-1v ${size === 'small' && 'fr-progress--sm'}`}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={progress ?? 0}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <motion.div
        className={`fr-progress__bar ${colorIndex != null && colors[colorIndex % colors.length]}`}
        animate={{
          width: `${progress ?? 0}%`,
          transition: { duration: 0.2 },
        }}
      >
        {displayProgress && `${progress ?? 0}%`}
      </motion.div>
    </div>
    {(title || value) && (
      <small className="fr-flex fr-justify-content-space-between">
        {title && <span>{title}</span>}
        {value && <span className="fr-text--bold">{value}</span>}
      </small>
    )}
  </div>
)

export default ProgressBar
