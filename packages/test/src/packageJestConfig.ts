import path from 'node:path'
import * as dotenv from 'dotenv'
import { createNodeModulesTransformIgnorePattern } from './transformIgnore'

// import meta does not work in jest env
const dotenvFile = path.resolve(__dirname, '../../../.env')

export const testDotenvConfig = () => {
  dotenv.config({ path: dotenvFile })
}

/**
 * Swc jest is not compatible with spy and jest mock. For mocking add the modules in mockableFilePatterns.
 * This will at some point be addressed by @swc/jest and we will remove this compatibility layer.
 */
export const packageJestConfig = ({
  transformIgnorePackages = [],
  testPathIgnorePatterns = [],
  mockableFilePatterns = [],
  customExportConditions,
  testMatch,
}: {
  transformIgnorePackages?: string[]
  testPathIgnorePatterns?: string[]
  mockableFilePatterns?: string[]
  testMatch?: string[]
  customExportConditions?: string[]
}) => {
  testDotenvConfig()

  // Swc jest is not compatible with spy and jest mock. For mocking add the modules here.
  // See https://github.com/swc-project/swc/issues/5059
  // '^.+packages/foo/src/common/cache\\.ts$': 'ts-jest',
  const tsJestTransformPattern = mockableFilePatterns.join('|')

  const transform = tsJestTransformPattern
    ? {
        [tsJestTransformPattern]: 'ts-jest',
        '^.+\\.(t|j)sx?$': '@swc/jest',
      }
    : {
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
    globals: {
      'ts-jest': {
        tsconfig: {
          sourceMap: true,
          inlineSources: false,
        },
      },
    },
  }
}
