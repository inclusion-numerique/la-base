import classNames from 'classnames'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'

const RequiredFieldsDisclamer = ({ className }: { className?: string }) => (
  <p className={classNames('fr-text--sm fr-hint-text', className)}>
    Les champs avec <RedAsterisk /> sont obligatoires.
  </p>
)

export default RequiredFieldsDisclamer
