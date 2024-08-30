import Link from 'next/link'

const Newsletter = () => (
  <div className="fr-background-action-low--blue-france fr-py-6w">
    <div className="fr-container">
      <div className="fr-flex-md fr-flex-gap-4v">
        <div>
          <h2 className="fr-mb-1w fr-h4">
            Abonnez-vous à notre lettre d’information&nbsp;!
          </h2>
          <p>
            Chaque mois, découvrez les nouvelles fonctionnalités des Bases ainsi
            qu&apos;une sélection de ressources et de créateurs. Le tout,
            directement dans votre boîte mail !
          </p>
          <Link
            href="https://dc259ca5.sibforms.com/serve/MUIFANPiNe5NUHtDZqZYZ6iyYIKNDL-3EAzRq8JWjLYAWnMcQh9P3uAjtmLh31veRMNPcxBXxYCkAlJitPr2eUWPdUaJm1l96XxzDPx_DxSd2ZxhfXtUQY-P_Qaq7GOZeuww7DCboCBztN7lTtVVXhJFueIzPWFrvGN-0AIYrHUBfhmgtBP9WtP8Z7Hr5tbmTJQpoLmijiI8yb8H"
            target="_blank"
            rel="noreferrer"
            title="Accéder à l'inscription à la lettre d'information - nouvelle fenêtre"
            className="fr-btn"
          >
            S’abonner
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
            <Link href="mailto:lesbases@anct.gouv.fr">
              lesbases@anct.gouv.fr
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Newsletter
