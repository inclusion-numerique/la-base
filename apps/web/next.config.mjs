import { withSentryConfig } from '@sentry/nextjs'
import withBundleAnalyzer from '@next/bundle-analyzer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// Some packages export a lot of modules in a single index file. To avoid them being compiled
// next has added native support for modularize import transform
// https://nextjs.org/docs/advanced-features/compiler#modularize-imports
// https://github.com/vercel/next.js/tree/canary/examples/modularize-imports
const modularizeImports = {
  'date-fns': { transform: 'date-fns/{{member}}' },
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverComponentsExternalPackages = ['html-minifier']

// Mjml cannot be bundled as it uses dynamic requires
// Only put library required on the server in externals as they would not be available in client
const externals = ['mjml', 'mjml-core']

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@app/emails'],
  experimental: {
    // See https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsExternalPackages
    serverComponentsExternalPackages,
    // This includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(dirname, '../../'),
    instrumentationHook: true,
  },
  modularizeImports,
  eslint: {
    // Lints are checked in other parts of the build process
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type checks are done in other parts of the build process
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Disable bundling or public static css assets
    // See dsfr-imports.css
    config.module.rules.push({
      test: /\.min.css$/,
      use: [], // An empty set of loaders, effectively bypassing these files
    })
    // (this is not an array, this is a rule object)
    // eslint-disable-next-line unicorn/no-array-push-push
    config.module.rules.push({
      test: /\.remixicon.css$/,
      use: [], // An empty set of loaders, effectively bypassing these files
    })

    if (!isServer) {
      // Client bundling
      return config
    }

    // Server bundling

    config.externals.push(...externals)

    return config
  },
}

const enableRelease = process.env.SENTRY_ENABLE_RELEASE === 'true'

export default withBundleAnalyzerConfig(
  withSentryConfig(nextConfig, {
    silent: false, // Suppresses all logs
    autoInstrumentServerFunctions: true,
    autoInstrumentMiddleware: true,
    tunnelRoute: '/monitoring',
    widenClientFileUpload: true,
    hideSourceMaps: true,
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
    sourcemaps: {
      disable: !enableRelease,
    },
  }),
)
