const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const path = require('node:path')
const packageJson = require('./package.json')

const isDevelopment = process.env.NODE_ENV === 'development'

// Some packages export a lot of modules in a single index file. To avoid them being compiled
// next has added native support for modularize import transform
// https://nextjs.org/docs/advanced-features/compiler#modularize-imports
// https://github.com/vercel/next.js/tree/canary/examples/modularize-imports
const modularizeImports = {
  'date-fns': { transform: 'date-fns/{{member}}' },
  'chart.js': { transform: 'chart.js/{{member}}' },
}

/**
 * For faster dev UX, server dependencies do not need to be bundled.
 * Except those that are expected to be bundled for compilation features.
 */
const alwaysBundledPackages = new Set([
  'next',
  'server-only',
  '@codegouvfr/react-dsfr',
])
const externalServerPackagesForFasterDevelopmentUx = isDevelopment
  ? [
      ...Object.keys(packageJson.dependencies),
      ...Object.keys(packageJson.devDependencies),
    ].filter((packageName) => !alwaysBundledPackages.has(packageName))
  : undefined

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@app/emails'],
  experimental: {
    typedRoutes: true,
    appDir: true,
    // See https://beta.nextjs.org/docs/api-reference/next.config.js#servercomponentsexternalpackages
    serverComponentsExternalPackages:
      externalServerPackagesForFasterDevelopmentUx,
    // serverComponentsExternalPackages: [
    //   'nanoid',
    //   'mjml',
    //   'mjml-core',
    //   ...externalServerPackagesForFasterDevelopmentUx,
    // ],
    // This includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../'),
    // outputFileTracingExcludes: {
    //   '/api/hello': ['./un-necessary-folder/**/*'],
    // },
    // outputFileTracingIncludes: {
    //   '/api/another': ['./necessary-folder/**/*'],
    // },
  },
  modularizeImports,
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  sentry: {
    autoInstrumentServerFunctions: true,
    autoInstrumentMiddleware: true,
    tunnelRoute: '/monitoring',
    widenClientFileUpload: true,
    hideSourceMaps: true,
  },
  eslint: {
    // Lints are checked in other parts of the build process
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type checks are done in other parts of the build process
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client bundling
      return config
    }

    // Server bundling

    // Mjml cannot be bundled as it uses dynamic requires
    // Only put library required on the server in externals as they would not be available in client
    config.externals.push('mjml', 'mjml-core')

    return config
  },
}

// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options.
const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
}

module.exports = withBundleAnalyzer(
  withSentryConfig(nextConfig, sentryWebpackPluginOptions),
)
