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

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@app/emails'],
  // `mjml` et ses satellites font des require dynamiques et ne peuvent pas être empaquetés ;
  // ils étaient jusqu'ici poussés dans les `externals` du hook webpack. `serverExternalPackages`
  // exprime la même chose pour les deux bundlers. pg (via @prisma/adapter-pg) charge pg-native
  // de façon optionnelle : on laisse Node résoudre le paquet au lieu de le bundler.
  serverExternalPackages: [
    'html-minifier',
    'mjml',
    'mjml-core',
    '@prisma/adapter-pg',
    'pg',
  ],
  // This includes files from the monorepo base two directories up
  outputFileTracingRoot: path.join(dirname, '../../'),
  modularizeImports,
  typescript: {
    // Type checks are done in other parts of the build process
    ignoreBuildErrors: true,
  },
  // Le hook `webpack` a disparu avec le passage à Turbopack. Ses deux règles écartaient les
  // `.min.css` du traitement, parce que le `css-loader` de webpack déborde sa pile d'appels sur
  // `dsfr.min.css` — 700 Ko sur une seule ligne. Turbopack les compile sans difficulté ; seul
  // Cypress en a encore besoin, et la règle vit désormais dans packages/e2e/next.config.js.
  turbopack: {
    // Le DSFR embarque des blocs `@media screen and (min-width: 0\0)`, un hack qui ne vise
    // qu'Internet Explorer 8 à 11. Turbopack refuse de parser la requête et écarte ces blocs —
    // c'est le comportement souhaitable, ces règles ne s'appliquaient dans aucun navigateur
    // vivant. On tait l'avertissement en visant les seuls fichiers concernés.
    ignoreIssue: [
      {
        path: /public\/dsfr\/.*\.min\.css$/,
        title: /Parsing CSS source code failed/,
      },
    ],
  },
}

const enableRelease = process.env.SENTRY_ENABLE_RELEASE === 'true'

export default withBundleAnalyzerConfig(
  withSentryConfig(nextConfig, {
    silent: false, // Suppresses all logs
    // Sentry 10 a regroupé les réglages propres au bundler sous `webpack`. Les équivalents à
    // la racine existent encore mais sont dépréciés (et sans effet sous Turbopack).
    webpack: {
      autoInstrumentServerFunctions: true,
      autoInstrumentMiddleware: true,
    },
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
