'use client'

import { SelectOption } from '@app/ui/components/Form/utils/options'
import { BaseMembersSortType } from '@app/web/app/(public)/bases/[slug]/(consultation)/membres/searchParams'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { Fragment, RefObject, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import styles from './BaseMembersSort.module.css'

const BaseMembersSort = ({
  slug,
  sortBy,
}: {
  slug: string
  sortBy: BaseMembersSortType
}) => {
  const router = useRouter()
  const url = getServerUrl(`/bases/${slug}/membres`)
  const [selected, setSelected] = useState<BaseMembersSortType>(sortBy)
  const [open, setOpen] = useState(false)
  const optionsRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(optionsRef as RefObject<HTMLDivElement>, () =>
    setOpen(false),
  )

  const onSelect = (option: SelectOption<BaseMembersSortType>) => {
    setSelected(option.value)
    setOpen(false)
    router.push(`${url}?tri=${option.value}`)
  }

  const onUnselect = () => {
    setSelected('Alphabetique')
    setOpen(false)
    router.push(url)
  }

  const onClick = (option: SelectOption<BaseMembersSortType>) => {
    if (selected === option.value) {
      onUnselect()
      return
    }
    onSelect(option)
  }

  const options: SelectOption<BaseMembersSortType>[] = [
    {
      label: 'Ordre alphabétique',
      value: 'Alphabetique',
    },
    { label: 'Rôle', value: 'Role' },
    { label: 'Les plus récents', value: 'Recent' },
    { label: 'Les plus anciens', value: 'Ancien' },
  ]
  return (
    <div className={styles.filterContainer} ref={optionsRef}>
      <Button
        className={classNames(styles.button, open && styles.buttonOpen)}
        priority="tertiary no outline"
        iconId={`fr-icon-arrow-${open ? 'up' : 'down'}-s-line`}
        iconPosition="right"
        onClick={() => setOpen(!open)}
      >
        Trier par: {options.find((option) => option.value === selected)?.label}
      </Button>
      {open && (
        <div className={styles.options}>
          {options.map((option) => (
            <Fragment key={option.value}>
              <button
                key={option.label}
                type="button"
                className={styles.option}
                onClick={() => onClick(option)}
              >
                <div>{option.label}</div>
                <span
                  className={classNames(
                    'fr-icon--sm fr-icon-check-line fr-text-title--blue-france',
                    selected !== option.value && 'fr-hidden',
                  )}
                />
              </button>
              <hr className={styles.separator} />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default BaseMembersSort
