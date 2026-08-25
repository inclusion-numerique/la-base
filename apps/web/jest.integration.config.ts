import { packageJestConfig } from '../../packages/test/src/packageJestConfig.ts'

export default packageJestConfig({
  transformIgnorePackages: [],
  testPathIgnorePatterns: ['<rootDir>/.next/'],
  testMatch: ['<rootDir>/src/**/*.integration.ts'],
  customExportConditions: [],
})
