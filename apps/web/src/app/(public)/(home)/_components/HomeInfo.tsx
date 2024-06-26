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
  <div className="fr-background-alt--blue-france fr-py-15w fr-mt-5w">
    <div className="fr-container">
      <div className="fr-text--center">
        <h2 className="fr-mb-0 fr-h3">
          Comment utiliser cette plateforme&nbsp;?
        </h2>
        <p className="fr-text--xl fr-mb-4w">
          Pour en savoir plus, vous pouvez visiter notre{' '}
          <Link href="/centre-d-aide" className="fr-link fr-text--xl">
            centre d&apos;aide
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
