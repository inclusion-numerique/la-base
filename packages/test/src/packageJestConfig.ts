import path from 'node:path'
import * as dotenv from 'dotenv'
import { createNodeModulesTransformIgnorePattern } from './transformIgnore.ts'

// jest 30 charge les configs en ESM : __dirname n'existe plus, import.meta est disponible
const dotenvFile = path.resolve(import.meta.dirname, '../../../.env')

export const testDotenvConfig = () => {
  dotenv.config({ path: dotenvFile })
}

/**
 * `mockableFilePatterns` a été retiré avec ts-jest : il permettait de router certains fichiers
 * vers ts-jest, @swc/jest ne gérant pas les spies (https://github.com/swc-project/swc/issues/5059).
 * ts-jest déclare `typescript: >=4.3 <7` et ne fonctionne donc pas avec TypeScript 7. Son unique
 * point de branchement — apps/web/jest.config.ts — n'était référencé par aucun script et visait
 * deux fichiers inexistants. À rétablir si une version de ts-jest supportant TypeScript 7 paraît.
 */
export const packageJestConfig = ({
  transformIgnorePackages = [],
  testPathIgnorePatterns = [],
  customExportConditions,
  testMatch,
}: {
  transformIgnorePackages?: string[]
  testPathIgnorePatterns?: string[]
  testMatch?: string[]
  customExportConditions?: string[]
}) => {
  testDotenvConfig()

  const transform = {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  }

  return {
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    transform,
    transformIgnorePatterns: [
      createNodeModulesTransformIgnorePattern(transformIgnorePackages),
    ],
    setupFilesAfterEnv: ['<rootDir>/../../packages/test/src/jest.setup.ts'],
    testMatch: testMatch ?? [
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.integration.ts',
      '**/*.integration.tsx',
    ],
    moduleNameMapper: {
      '@sentry/nextjs': '<rootDir>/../../packages/test/src/mocks/sentry.ts',
      '\\.module\\.css$': 'identity-obj-proxy', // Mock CSS modules
      '^@app/web/(.*)$': '<rootDir>/../../apps/web/src/$1',
      '^@app/cli/(.*)$': '<rootDir>/../../apps/cli/src/$1',
      '^@app/cdk/(.*)$': '<rootDir>/../../packages/cdk/src/$1',
      '^@app/config/(.*)$': '<rootDir>/../../packages/config/src/$1',
      '^@app/fixtures/(.*)$': '<rootDir>/../../packages/fixtures/src/$1',
      '^@prisma/client$':
        '<rootDir>/../../apps/web/node_modules/@prisma/client',
      '^@app/ui/(.*)$': '<rootDir>/../../packages/ui/src/$1',
      '^@app/emails/(.*)$': '<rootDir>/../../packages/emails/src/$1',
      '^@app/lint/(.*)$': '<rootDir>/../../packages/lint/src/$1',
      '^@app/storybook/(.*)$': '<rootDir>/../../packages/storybook/src/$1',
      '^@app/test/(.*)$': '<rootDir>/../../packages/test/src/$1',
    },
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      ...testPathIgnorePatterns,
    ],
    testEnvironment: 'node',
    testEnvironmentOptions: {
      customExportConditions: customExportConditions ?? [
        'react-server',
        'node',
        'node-addons',
      ],
    },
    // Coverage configuration
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['json', 'lcov', 'text-summary'],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.spec.{ts,tsx}',
      '!src/**/*.integration.{ts,tsx}',
      '!src/**/*.stories.{ts,tsx}',
    ],
  }
}
