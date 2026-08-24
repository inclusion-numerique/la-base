import { packageJestConfig } from '../../packages/test/src/packageJestConfig.ts'

export default packageJestConfig({
  transformIgnorePackages: [],
  testPathIgnorePatterns: ['<rootDir>/.next/', '.integration.ts$'],
})
