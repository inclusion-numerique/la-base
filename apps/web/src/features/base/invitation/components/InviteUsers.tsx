'use client'

import { SelectOptionValid } from '@app/ui/components/Form/OptionBadge'
import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import {
  type Dispatch,
  type SetStateAction,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { FieldError } from 'react-hook-form'
import InviteMemberCard from '../../../../components/InviteUserCard'
import MultipleSearchableSelect, {
  type MultipleSearchableSelectRef,
} from '../../../../components/MultipleSearchableSelect'

const InviteUsers = forwardRef<
  MultipleSearchableSelectRef,
  {
    label: string
    setEmailsError: Dispatch<SetStateAction<boolean>>
    error?: FieldError
    onChange: (event: SelectOptionValid[]) => void
    baseId?: string
    resourceId?: string
    disabled?: boolean
    handleSelectUserType?: (type: string) => void
    selectedMemberType: 'admin' | 'member'
    withBadges?: boolean
    canAddAdmin: boolean
    withAddButton?: boolean
  }
>(
  (
    {
      label,
      setEmailsError,
      error,
      onChange,
      baseId,
      resourceId,
      disabled,
      selectedMemberType,
      withBadges = true,
      canAddAdmin,
      withAddButton = true,
    },
    ref,
  ) => {
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
        onChange(selections)
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
        extra: {
          email: user.email,
          image: user.image,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        component: <InviteMemberCard user={user} />,
      })) ?? []

    return (
      <>
        <MultipleSearchableSelect
          ref={ref}
          disabled={disabled}
          data-testid="invite-member-modal-input"
          label={label}
          placeholder="Adresse email, nom de profil"
          onSelect={onSelect}
          onInputChange={setUserSearchQuery}
          selectedMemberType={selectedMemberType}
          options={userOptions}
          withBadges={withBadges}
          canAddAdmin={canAddAdmin}
          withAddButton={withAddButton}
        />
        {error?.message && (
          <p className="fr-error-text" data-testid="invite-members-error">
            {error.message}
          </p>
        )}
      </>
    )
  },
)

InviteUsers.displayName = 'InviteUsers'

export default withTrpc(InviteUsers)
