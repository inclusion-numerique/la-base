export const JoinRequestAlreadyProcessed = () => (
  <div
    className="fr-flex fr-direction-column fr-background-alt--blue-ecume"
    style={{ minHeight: '100%' }}
  >
    <div className="fr-container fr-container--slim fr-m-auto fr-background-default--grey fr-border-radius--16 fr-p-12v fr-text--center">
      <img
        src="/images/visuel-erreur.svg"
        alt=""
        className="fr-mb-6v fr-mx-auto fr-display-block"
      />
      <h1 className="fr-h3 fr-text-title--blue-france fr-mb-0 fr-mx-md-12v">
        Cette invitation n’est plus valide.
      </h1>
      <p className="fr-my-12v">
        Vous avez déjà accepté ou refusé cette invitation.
      </p>
    </div>
  </div>
)
