export const getEventDsfrOpenedModalParent = (event: Event) =>
  event.target &&
  'closest' in event.target &&
  typeof event.target.closest === 'function'
    ? (event.target as HTMLElement).closest('dialog.fr-modal--opened')
    : undefined
