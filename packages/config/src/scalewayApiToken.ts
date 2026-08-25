/**
 * Jeton présenté à l'API Scaleway dans l'en-tête `X-Auth-Token`.
 *
 * `SCW_SECRET_KEY` ne peut pas remplir seule ce rôle en local : l'application y lit les
 * mêmes `SCW_ACCESS_KEY`/`SCW_SECRET_KEY` pour joindre son S3 — un MinIO de développement
 * (`docker-compose.dev.yml`), dont les identifiants sont `minioadmin`. Présentées à
 * Scaleway, ces valeurs donnent :
 *
 *   { "message": "authentication is denied", "method": "api_key",
 *     "reason": "invalid_argument", "type": "denied_authentication" }
 *
 * `SCW_API_KEY_SECRET` sépare donc les deux usages. Le repli sur `SCW_SECRET_KEY` conserve
 * le comportement partout où la distinction n'a pas lieu d'être — la CI et les
 * déploiements, où ces clés désignent bien le vrai compte Scaleway.
 */
// `||` et non `??` : une variable présente mais vide — ce que produit un `.env` généré
// depuis le gabarit — doit être traitée comme absente, sinon elle neutralise le repli.
export const scalewayApiToken = () =>
  process.env.SCW_API_KEY_SECRET || process.env.SCW_SECRET_KEY || ''
