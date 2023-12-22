// The node protocol fails storybook bundling, I did not succeed in finding out why this file is bundled or to rename node:crypto in the storybook webpack config
// eslint-disable-next-line unicorn/prefer-node-protocol
import { createHash, randomBytes } from 'crypto'
/**
 * A hash identifier for a visit on the website.
 */
export const createVisitHash = (seed?: string): string =>
  createHash('sha256')
    .update(seed || randomBytes(16).toString('hex'))
    .digest('hex')
