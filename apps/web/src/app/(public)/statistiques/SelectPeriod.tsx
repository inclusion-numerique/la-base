'use client'

import {
  SegmentedControl,
  type SegmentedControlProps,
} from '@codegouvfr/react-dsfr/SegmentedControl'
import { Select } from '@codegouvfr/react-dsfr/Select'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const SelectPeriod = ({
  param,
  segments,
}: {
  param: string
  segments: { label: string; param: string }[]
}) => {
  const appRouter = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const onSelect = (period: string) => {
    appRouter.push(`statistiques?${createQueryString(param, period)}`, {
      scroll: false,
    })
  }

  return (
    <>
      <Select
        className="fr-hidden-md fr-mt-3w"
        label="Choix de la période"
        nativeSelectProps={{
          onChange: (event) => onSelect(event.target.value),
          value: searchParams?.get(param) || '',
        }}
      >
        {segments.map((segment) => (
          <option key={segment.param} value={segment.param}>
            {segment.label}
          </option>
        ))}
      </Select>
      <SegmentedControl
        className="fr-display-block fr-hidden fr-unhidden-md"
        hideLegend
        legend="Choix de la période"
        segments={
          segments.map((segment, index) => ({
            label: segment.label,
            nativeInputProps: {
              checked:
                searchParams?.get(param) === segment.param ||
                (searchParams?.get(param) == null && index === 0),
              onChange: () => onSelect(segment.param),
            },
          })) as unknown as SegmentedControlProps.Segments
        }
      />
    </>
  )
}

export default SelectPeriod
