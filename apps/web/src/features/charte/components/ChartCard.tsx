import IconInSquare from '@app/web/components/IconInSquare'
import { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './ChartCard.module.css'

export interface ChartCardProps {
  title: string
  iconId: ButtonProps.IconOnly['iconId']
  resourceLink: { label: string; href: string }
  items: string[]
}

export const ChartCard = ({
  title,
  resourceLink,
  iconId,
  items,
}: ChartCardProps) => {
  return (
    <div className="fr-flex fr-direction-column fr-justify-content-space-between fr-px-3w fr-py-4w fr-pt-md-5w fr-pb-md-6w fr-px-md-6w fr-border fr-border-radius--16">
      <div>
        <div className="fr-flex fr-align-items-center fr-flex-gap-4v fr-mb-3w">
          <IconInSquare
            iconId={iconId}
            iconClassName={classNames(
              'fr-text-title--blue-france',
              iconId === 'ri-git-fork-line' && styles.rotate90,
            )}
          />
          <h3 className="fr-h5 fr-mb-0">{title}</h3>
        </div>
        <span className="fr-text--xs fr-text--bold fr-text-mention--grey fr-text--uppercase">
          Votre ressource :
        </span>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="fr-flex fr-direction-column">
        <span className="fr-text--xs fr-text--bold fr-text-mention--grey fr-text--uppercase fr-mb-2v">
          Exemple de ressource contribuant à ce principe :
        </span>
        <Link
          className="fr-link fr-link--no-underline fr-text--underline"
          href={resourceLink.href}
        >
          {resourceLink.label}
        </Link>
      </div>
    </div>
  )
}
