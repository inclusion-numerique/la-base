'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { FieldError } from 'react-hook-form'
import { SelectOptionValid } from '@app/ui/components/Form/OptionBadge'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import InviteMemberCard from './InviteUserCard'
import MultipleSearchableSelect from './MultipleSearchableSelect'

const InviteUsers = ({
  label,
  setEmailsError,
  error,
  onChange,
  baseId,
  resourceId,
  disabled,
}: {
  label: string
  setEmailsError: Dispatch<SetStateAction<boolean>>
  error?: FieldError
  onChange: (event: string[]) => void
  baseId?: string
  resourceId?: string
  disabled?: boolean
}) => {
  const [filter, setFilter] = useState('')

  // TODO : debounce
  const { data: users } = trpc.profile.getMatchingUsers.useQuery(
    {
      filter,
      baseId,
      resourceId,
    },
    {
      enabled: !!filter,
    },
  )

  return (
    <>
      <MultipleSearchableSelect
        disabled={disabled}
        data-testid="invite-member-modal-input"
        label={label}
        placeholder="Adresse email, nom de profil"
        setSelecteds={(selections: SelectOptionValid[]) => {
          setEmailsError(selections.some((selection) => selection.invalid))
          onChange(selections.map((selection) => selection.value))
        }}
        filter={() => true}
        setInput={setFilter}
        options={
          users
            ? users.map((user) => ({
                name: user.email,
                value: user.id,
                component: <InviteMemberCard user={user} />,
              }))
            : []
        }
      />
      {error?.message && (
        <p className="fr-error-text" data-testid="invite-members-error">
          {error.message}
        </p>
      )}
    </>
  )
}

export default withTrpc(InviteUsers)
