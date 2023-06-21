import React, { useEffect, useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { useOnDiff } from '@app/web/hooks/useOnDiff'
import styles from './RichInputFormLinkTooltip.module.css'

const tooltipTopOffset = 40

const RichInputFormLinkTooltip = ({
  element,
  onEdit,
  onDelete,
}: {
  element: HTMLAnchorElement | null
  onEdit: (element: HTMLAnchorElement) => void
  onDelete: (element: HTMLAnchorElement) => void
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
      <span
        className={classNames('fr-icon-link fr-icon--sm', styles.linkIcon)}
      />
      <span className={classNames('fr-text--xs', styles.url)}>{url}</span>
      <Button
        className={styles.button}
        priority="tertiary no outline"
        size="small"
        iconId="fr-icon-edit-line"
        title="Modifier le lien"
        type="button"
        onClick={() => {
          if (element) onEdit(element)
        }}
      />
      <Button
        className={styles.button}
        priority="tertiary no outline"
        size="small"
        iconId="fr-icon-link-unlink"
        title="Supprimer le lien"
        type="button"
        onClick={() => {
          if (element) onDelete(element)
        }}
      />
    </div>
  )
}

export default RichInputFormLinkTooltip
