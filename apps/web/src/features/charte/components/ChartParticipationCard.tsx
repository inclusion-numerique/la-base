interface ChartParticipationCardProps {
  title: string
  description: string
  imageUrl: string
  imageAlt: string
}

export const ChartParticipationCard = ({
  title,
  description,
  imageUrl,
  imageAlt,
}: ChartParticipationCardProps) => (
  <div className="fr-border-radius--16 fr-p-md-6w fr-px-3w fr-py-4w fr-width-full fr-background-default--grey">
    <div className="fr-flex fr-direction-column fr-flex-gap-6v ">
      <div>
        <img src={imageUrl} alt={imageAlt} />
      </div>
      <div className="fr-flex fr-direction-column">
        <span className="fr-h6">{title}</span>
        <p className="fr-mb-0 fr-text--lg fr-text-mention--grey">
          {description}
        </p>
      </div>
    </div>
  </div>
)
