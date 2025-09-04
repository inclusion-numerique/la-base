import { DragControls } from 'framer-motion'
import React from 'react'

const onDragButtonPointerDown = (
  controls: DragControls,
  event: React.PointerEvent<Element>,
) => {
  controls.start(event)
}

const onDragStart = (
  buttonRef: React.RefObject<HTMLButtonElement | null>,
  _event: MouseEvent | TouchEvent | PointerEvent,
) => {
  const button = buttonRef.current
  if (button) {
    button.style.cursor = 'grabbing'
  }
}

const onDragEnd = (
  buttonRef: React.RefObject<HTMLButtonElement | null>,
  event: MouseEvent | TouchEvent | PointerEvent,
) => {
  const button = buttonRef.current
  if (button) {
    button.style.cursor = ''
  }

  return event
}

const handleDragKeyDown = (
  event: React.KeyboardEvent,
  onSelect: () => void,
) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    onSelect()
  }
}

const ReorderItemCommonProps = {
  drag: true,
  dragListener: false,
  dragSnapToOrigin: true,
  dragTransition: {
    bounceStiffness: 450,
    bounceDamping: 30,
  },
  whileDrag: {
    cursor: 'grabbing',
  },
  layout: 'position',
  animate: { opacity: 1, height: 'auto' },
  initial: false,
  exit: {
    opacity: 0,
    height: 0,
  },
  transition: {
    duration: 0.2,
  },
} as const

const moveUp = async (
  index: number,
  onMove: (fromIndex: number, toIndex: number) => Promise<void> | void,
) => {
  if (index === 0) return
  await onMove(index, index - 1)
}

const moveDown = async (
  index: number,
  length: number,
  onMove: (fromIndex: number, toIndex: number) => Promise<void> | void,
) => {
  if (index === length - 1) return
  await onMove(index, index + 1)
}

const handleKeyDown = async (
  event: React.KeyboardEvent,
  length: number,
  onMove: (fromIndex: number, toIndex: number) => Promise<void> | void,
) => {
  const targetId = (event.target as HTMLButtonElement).id
  const matchUpButton = targetId.match(/arrow-up-button-(\d+)/)
  const matchDownButton = targetId.match(/arrow-down-button-(\d+)/)
  const buttonIndex = matchUpButton
    ? Number.parseInt(matchUpButton[1], 10)
    : matchDownButton
      ? Number.parseInt(matchDownButton[1], 10)
      : null

  switch (event.key) {
    case ' ': {
      event.preventDefault()
      if (buttonIndex !== null) {
        if (matchUpButton && buttonIndex > 0) {
          await moveUp(buttonIndex, onMove)
        }
        if (matchDownButton && buttonIndex < length - 1) {
          await moveDown(buttonIndex, length, onMove)
        }
      }
      break
    }
    default: {
      break
    }
  }
}

export const useDraggable = () => ({
  onDragButtonPointerDown,
  onDragStart,
  onDragEnd,
  handleKeyDown,
  handleDragKeyDown,
  moveUp,
  moveDown,
  'aria-keyshortcuts': 'Space|Enter + ArrowUp|ArrowDown, Escape',
  ReorderItemCommonProps,
})
