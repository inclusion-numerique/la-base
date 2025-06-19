'use client'

import dynamic from 'next/dynamic'

// Only load feedback modal lazyly, in a different chunk, on browser
const LazyFeedbackModal = dynamic(
  () => import('@app/web/components/Feedback/FeedbackModal'),
  { ssr: false },
)

export default LazyFeedbackModal
