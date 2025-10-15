import Card from '@app/web/components/Card'
import { searchResultBeneficiaryHref } from '@app/web/themes/searchResultHrefHelpers'
import ProgressBar from '@app/web/ui/ProgressBar'
import type { Beneficiary } from '@prisma/client'
import Link from 'next/link'

const Beneficiaries = ({
  beneficiaries,
}: {
  beneficiaries: {
    beneficiary: Beneficiary
    label: string
    value: number
    progress: number
  }[]
}) => {
  return (
    <Card title="Les bénéficiaires les plus utilisés">
      {beneficiaries.map(({ label, progress, value, beneficiary }, index) => (
        <ProgressBar
          key={label}
          className="fr-mb-5v"
          ariaLabel={label}
          progress={progress}
          value={value}
          title={
            <Link href={searchResultBeneficiaryHref(beneficiary)}>{label}</Link>
          }
          colorIndex={index}
        />
      ))}
    </Card>
  )
}

export default Beneficiaries
