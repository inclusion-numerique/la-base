import { DragControls } from 'framer-motion'

const onDragButtonPointerDown = (
  controls: DragControls,
  event: React.PointerEvent<Element>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  controls.start(event)
}

const onDragStart = (
  buttonRef: React.RefObject<HTMLButtonElement>,
  _event: MouseEvent | TouchEvent | PointerEvent,
) => {
  const button = buttonRef.current
  if (button) {
    button.style.cursor = 'grabbing'
  }
}

const onDragEnd = (
  buttonRef: React.RefObject<HTMLButtonElement>,
  event: MouseEvent | TouchEvent | PointerEvent,
) => {
  const button = buttonRef.current
  if (button) {
    button.style.cursor = ''
  }

  return event
}

const handleKeyDown = (event: React.KeyboardEvent, onSelect: () => void) => {
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
  onMove: (fromIndex: number, toIndex: number) => Promise<void>,
) => {
  if (index === 0) return
  await onMove(index, index - 1)
}

const moveDown = async (
  index: number,
  length: number,
  onMove: (fromIndex: number, toIndex: number) => Promise<void>,
) => {
  if (index === length - 1) return
  await onMove(index, index + 1)
}

export const useDraggable = () => ({
  onDragButtonPointerDown,
  onDragStart,
  onDragEnd,
  handleKeyDown,
  moveUp,
  moveDown,
  'aria-keyshortcuts': 'Space|Enter + ArrowUp|ArrowDown, Escape',
  ReorderItemCommonProps,
})
