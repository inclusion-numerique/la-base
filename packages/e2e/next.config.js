import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nextConfig from '../../apps/web/next.config.mjs'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDsfr = path.resolve(dirname, '../../apps/web/public/dsfr')

// Cypress est le dernier consommateur webpack du dépôt : ses tests de composants compilent
// avec le préréglage Next, là où l'application est passée à Turbopack.
//
// Or le `css-loader` de webpack déborde sa pile d'appels sur `dsfr.min.css` — 700 Ko sur une
// seule ligne. C'était la raison d'être des règles `.min.css` de l'ancien hook `webpack` de
// `apps/web/next.config.mjs`. Ces feuilles sont donc écartées du graphe de modules côté
// Cypress uniquement ; Turbopack, lui, les compile sans difficulté.
export default {
  ...nextConfig,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      [path.join(publicDsfr, 'dsfr.min.css')]: false,
      [path.join(publicDsfr, 'utility/utility.min.css')]: false,
    }

    return config
  },
}
