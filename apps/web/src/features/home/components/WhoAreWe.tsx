import ExternalLink from '@app/ui/components/ExternalLink'
import AnctLogo from '@app/web/features/home/components/AnctLogo'

const WhoAreWe = () => (
  <div className="fr-container fr-unhidden-md fr-hidden">
    <div className="fr-text--center fr-flex fr-direction-column fr-align-items-center fr-justify-content-center fr-pt-10w fr-pb-14w">
      <AnctLogo />
      <h2 className="fr-h2 fr-mt-3w">Qui sommes nous ?</h2>
      <span className="fr-text--lg">
        Nous sommes l'équipe du&nbsp;
        <ExternalLink
          href="https://societenumerique.gouv.fr/"
          className="fr-link fr-text--lg"
        >
          Programme Société Numérique
        </ExternalLink>
        &nbsp;qui porte la politique nationale d'inclusion numérique, formalisée
        par une feuille de route co-écrite avec l'ensemble des acteurs du
        secteur :&nbsp;
        <ExternalLink
          href="https://www.societenumerique.gouv.fr/nos-missions/france-numerique-ensemble"
          className="fr-link fr-text--lg"
        >
          France Numérique Ensemble
        </ExternalLink>
        .
      </span>
      <span className="fr-text--lg">
        Le programme œuvre pour le développement d'un numérique d'intérêt
        général qui ambitionne d'être ouvert, éthique, durable, souverain et,
        bien sûr, inclusif.
      </span>
      <span className="fr-text--lg">
        Nous suivons l'approche
        <ExternalLink
          href="https://beta.gouv.fr"
          className="fr-link fr-text--lg"
        >
          beta.gouv.fr
        </ExternalLink>
        qui place l'expérience utilisateur au coeur de la conception produit.
      </span>
    </div>
  </div>
)

export default WhoAreWe
