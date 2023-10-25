const MaybeEmptyValue = ({ value }: { value: string | undefined | null }) =>
  value || <span className="fr-hint-text fr-my-0">-</span>

export default MaybeEmptyValue
