'use client'

import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { ResourceReportModal } from '@app/web/components/Resource/View/ResourceReportModal'

const ResourceReportButton = ({
  priority = 'secondary',
}: {
  priority?: ButtonProps['priority']
}) => (
  <Button
    className="fr-width-full fr-justify-content-center"
    iconId="fr-icon-warning-line"
    priority={priority}
    size="small"
    onClick={ResourceReportModal.open}
  >
    Signaler
  </Button>
)

export default ResourceReportButton
