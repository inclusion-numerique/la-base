import React, { useState } from 'react'
import classNames from 'classnames'
import { useOnDiff } from '@app/web/hooks/useOnDiff'
import styles from './RichTextLinkTooltip.module.css'

const tooltipTopOffset = 40

const RichTextFormLinkTooltip = ({
  element,
}: {
  element: HTMLAnchorElement | null
}) => {
  const [tooltipInfo, setTooltipInfo] = useState<{
    url: string
    top: number
    left: number
    right: number
  } | null>(null)
  const [isHover, setIsHover] = useState(false)

  useOnDiff(element, () => {
    if (!element) {
      return
    }
    const parent = element.offsetParent
    if (!parent) {
      return
    }
    const parentRect = parent.getBoundingClientRect()

    // We cannot use offsetLeft as it does not work for wrapping (multiline) elements
    // We use boundingRects to compute a valid offsetLeft and offsetTop
    const elementRect = element.getBoundingClientRect()

    const top =
      tooltipTopOffset + elementRect.height + elementRect.top - parentRect.top
    const left = elementRect.left - parentRect.left

    const right = parentRect.right - elementRect.right

    setTooltipInfo({
      url: element.getAttribute('href') ?? '',
      top,
      left,
      right,
    })
  })

  if (!tooltipInfo || (!element && !isHover)) {
    return null
  }
  const { url, top, left, right } = tooltipInfo

  return (
    <div
      className={styles.tooltip}
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
      style={
        // To prevent overflow of container, we place the tooltip on the side where there is most room
        left > right
          ? { top, right }
          : {
              top,
              left,
            }
      }
    >
      <a
        href={url}
        target="_blank"
        className={classNames('fr-text--xs', styles.url)}
        rel="noreferrer"
      >
        {url}
      </a>
    </div>
  )
}

export default RichTextFormLinkTooltip
