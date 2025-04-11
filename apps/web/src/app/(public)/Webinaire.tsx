import Link from 'next/link'

const Webinaire = () => (
  <div className="fr-background-action-low--blue-france fr-py-6w">
    <div className="fr-container">
      <div className="fr-flex-md fr-flex-gap-4v">
        <div>
          <h2 className="fr-mb-1w fr-h4">
            Participez à notre prochaine webinaire&nbsp;!
          </h2>
          <p>
            Vous souhaitez en savoir plus sur Les Bases du numérique d’intérêt
            général&nbsp;? Nous organisons régulièrement des webinaires pour
            présenter la plateforme & les prochaines évolutions.
          </p>
          <Link
            href="https://tally.so/r/n0OLxZ"
            target="_blank"
            rel="noreferrer"
            title="Accéder à l'inscription au prochain webinaire - nouvelle fenêtre"
            className="fr-btn"
          >
            S’inscrire au prochain webinaire
          </Link>
        </div>
        <div className="fr-border-right fr-border--blue-france fr-mx-md-10w" />
        <div className="fr-border-bottom fr-border--blue-france fr-my-3w fr-hidden-md" />
        <div>
          <h2 className="fr-mb-1w fr-h4">Nous contacter</h2>
          <p>
            En cas de questions, de suggestions, de propositions, n&apos;hésitez
            pas à nous contacter à l&apos;adresse suivante&nbsp;:
          </p>
          <div className="fr-text--lg fr-text-label--blue-france">
            <span className="ri-mail-fill fr-mr-1w" aria-hidden="true" />
            <Link href="mailto:support@lesbases.anct.gouv.fr">
              support@lesbases.anct.gouv.fr
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Webinaire
