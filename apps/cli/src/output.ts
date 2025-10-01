/**
 * Output fonction for CLI Commands.
 * Express the intent for CLI output instead of debug console.log that are
 * forbidden by our lint rules
 */
// biome-ignore lint/suspicious/noConsole: feature for cli package
export const output = console.log
// biome-ignore lint/suspicious/noConsole: feature for cli package
export const outputError = console.error
