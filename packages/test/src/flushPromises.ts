/**
 * Used in jest environment when microtask queue for promises gets bugged on ci environments
 */
export const flushPromises = () => new Promise(process.nextTick)
