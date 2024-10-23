'use client'

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { FieldError } from 'react-hook-form'
import { SelectOptionValid } from '@app/ui/components/Form/OptionBadge'
import { createToast } from '@app/ui/toast/createToast'
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
  const [userSearchQuery, setUserSearchQuery] = useState('')

  const { data: users, error: mutationError } =
    trpc.profile.searchProfileForMember.useQuery(
      {
        query: userSearchQuery,
        notInBaseId: baseId,
        notInResourceId: resourceId,
      },
      {
        // queryKey: ['profile.searchProfileForMember', { filter, baseId, resourceId }],
        enabled: !!userSearchQuery,
      },
    )

  const onSelect = useCallback(
    (selections: SelectOptionValid[]) => {
      onChange(selections.map((selection) => selection.value))
      setEmailsError(selections.some((selection) => selection.invalid))
    },
    [setEmailsError, onChange],
  )

  useEffect(() => {
    if (mutationError) {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la recherche des utilisateurs',
      })
    }
  }, [mutationError])

  const userOptions =
    users?.map((user) => ({
      label: user.name ?? '',
      value: user.id,
      component: <InviteMemberCard user={user} />,
    })) ?? []

  return (
    <>
      <MultipleSearchableSelect
        disabled={disabled}
        data-testid="invite-member-modal-input"
        label={label}
        placeholder="Adresse email, nom de profil"
        onSelect={onSelect}
        onInputChange={setUserSearchQuery}
        options={userOptions}
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
