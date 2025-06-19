import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import classNames from 'classnames'
import Link from 'next/link'

const RequiredFieldsDisclamer = ({
  className,
  helpLink,
}: {
  className?: string
  helpLink?: { href: string; text: string }
}) => (
  <p className={classNames('fr-text--sm fr-hint-text', className)}>
    Les champs avec <RedAsterisk /> sont obligatoires.{' '}
    {helpLink ? (
      <Link
        href={helpLink.href}
        target="_blank"
        rel="noopener noreferrer"
        className="fr-link fr-text--sm"
      >
        {helpLink.text}
      </Link>
    ) : null}
  </p>
)

export default RequiredFieldsDisclamer
