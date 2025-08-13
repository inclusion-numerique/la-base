import classNames from 'classnames'
import Link from 'next/link'
import styles from './HomeInfo.module.css'

const contents = [
  {
    title: 'Faire de la veille',
    icon: 'fr-icon-search-line',
    content:
      'Inspirez-vous des ressources produites par une communauté au service du numérique d’intérêt général.',
  },
  {
    title: 'Produire & diffuser des ressources',
    icon: 'fr-icon-file-text-line',
    content:
      'Présentez, valorisez & publiez vos ressources afin qu’elles soient diffusées auprès d’un large public.',
  },
  {
    title: 'Contribuer à une communauté',
    icon: 'fr-icon-team-line',
    content:
      'Collaborez & contribuez à la création et l’amélioration de ressources, localement ou à l’échelle nationale.',
  },
]

const HomeInfo = () => (
  <div className="fr-background-alt--blue-france fr-py-8w fr-py-md-15w fr-mt-md-5w">
    <div className="fr-container">
      <div className="fr-text--center">
        <h2 className="fr-mb-2w fr-h2">
          Comment utiliser cette plateforme&nbsp;?
        </h2>
        <p className="fr-text--xl fr-mb-6w">
          Pour en savoir plus, vous pouvez visiter notre{' '}
          <Link
            href="https://docs.numerique.gouv.fr/docs/a4351149-5e64-403b-a93f-2ac86e4c1043/"
            target="_blank"
            rel="noopener noreferrer"
            className="fr-link fr-text--xl"
          >
            centre d&apos;aide.
          </Link>
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {contents.map(({ title, icon, content }) => (
          <div
            className="fr-border fr-p-4w fr-background-default--grey fr-border-radius--16"
            key={title}
          >
            <div className={classNames(icon, styles.icon)} />
            <h3 className="fr-mb-3v fr-h5">{title}</h3>
            <p>{content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default HomeInfo
