import CustomTag, { TagColor } from '@app/web/components/CustomTag'

export const BaseHomePageCustomisationView = ({
  title,
  description,
  isEnabled,
}: {
  title: string
  description: string
  isEnabled: boolean
}) => (
  <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
    <div className="fr-flex fr-direction-column">
      <span className="fr-text-label--grey fr-text--bold">{title}</span>
      {isEnabled && <span>{description}</span>}
    </div>
    <div>
      <CustomTag
        label={isEnabled ? 'Activé' : 'Désactivé'}
        small
        {...(isEnabled && {
          icon: 'fr-icon-check-line',
        })}
        color={isEnabled ? TagColor.GREEN : TagColor.GREY}
      />
    </div>
  </div>
)
