import path from 'node:path'
import tsconfigPaths from 'tsconfig-paths'
import fs from 'node:fs'
import { logToFile } from './cypress/support/logToFile'

// Resolve the path to the Cypress tsconfig.json
const tsConfigPath = path.resolve(import.meta.dirname, './tsconfig.json')

// Check if tsconfig.json exists
if (fs.existsSync(tsConfigPath)) {
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8')) as {
    compilerOptions?: {
      baseUrl?: string
      paths?: Record<string, string[]>
    }
  }
  logToFile('tsconfig.json found:', tsConfig)

  if (
    tsConfig.compilerOptions &&
    tsConfig.compilerOptions.baseUrl &&
    tsConfig.compilerOptions.paths
  ) {
    logToFile('Registering path aliases...', tsConfig.compilerOptions.paths)
    tsconfigPaths.register({
      baseUrl: path.resolve(import.meta.dirname),
      paths: tsConfig.compilerOptions.paths,
    })

    logToFile('importing alias', import('@app/web/beneficiaire/beneficiaire'))
  } else {
    logToFile(
      'tsconfig.json does not contain "compilerOptions.baseUrl" or "compilerOptions.paths". Path aliases may not work as expected.',
    )
  }
} else {
  logToFile('tsconfig.json not found in the Cypress directory.')
}
