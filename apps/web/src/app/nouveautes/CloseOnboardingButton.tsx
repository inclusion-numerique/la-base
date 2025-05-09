import styles from '@app/web/app/nouveautes/CloseOnboardingButton.module.css'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'

const CloseOnboardingButton = ({
  mdBackground,
}: {
  mdBackground: 'blue-france-925-125' | 'blue-france-975-75'
}) => (
  <Button
    className={classNames(styles.closeButton, {
      [styles.mdBackgroundBlueFrance925125]:
        mdBackground === 'blue-france-925-125',
      [styles.mdBackgroundBlueFrance97575]:
        mdBackground === 'blue-france-975-75',
    })}
    iconId="fr-icon-close-line"
    priority="secondary"
    title="Fermer"
    linkProps={{
      href: '/',
    }}
  />
)

export default CloseOnboardingButton
