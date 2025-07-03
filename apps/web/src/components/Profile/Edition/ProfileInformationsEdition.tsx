'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import EditableCardForm from '@app/web/components/EditableCardForm'
import { MandatoryFields } from '@app/web/components/MandatoryFields'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import {
  profileFirstNameMaxLength,
  profileLastNameMaxLength,
} from '@app/web/server/profiles/profileConstraints'
import {
  type UpdateProfileInformationsCommand,
  UpdateProfileInformationsCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import { trpc } from '@app/web/trpc'
import { LabelAndValue } from '@app/web/ui/LabelAndValue'
import {
  departmentsOptions,
  getDepartmentName,
} from '@app/web/utils/departments'
import { htmlToText } from '@app/web/utils/htmlToText'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const firstNameInfo = (title?: string | null) =>
  `${title?.length ?? 0}/${profileFirstNameMaxLength} caractères`

const lastNameInfo = (title?: string | null) =>
  `${title?.length ?? 0}/${profileLastNameMaxLength} caractères`

const ProfileInformationsEdition = ({
  profile,
}: {
  profile: ProfilePageData
}) => {
  const form = useForm<UpdateProfileInformationsCommand>({
    resolver: zodResolver(UpdateProfileInformationsCommandValidation),
    defaultValues: {
      lastName: profile.lastName ?? undefined,
      firstName: profile.firstName ?? undefined,
      department: profile.department ?? undefined,
      description: profile.description ?? undefined,
    },
  })

  const router = useRouter()
  const mutation = trpc.profile.updateInformations.useMutation()

  const handleSave = async (data: UpdateProfileInformationsCommand) => {
    const updatedUser = await mutation.mutateAsync(data)
    router.push(`/profils/${updatedUser.slug}/modifier`)
  }

  return (
    <EditableCardForm
      id="informations"
      title="Informations sur votre profil"
      form={form}
      onSave={handleSave}
      preview={
        <>
          <LabelAndValue
            className="fr-mb-2w"
            value={profile.name}
            inline={false}
            as="div"
          >
            Prénom Nom
          </LabelAndValue>
          <LabelAndValue
            className="fr-mb-2w"
            value={profile.department && getDepartmentName(profile.department)}
            inline={false}
            as="div"
          >
            Département
          </LabelAndValue>
          <LabelAndValue value={profile.description} inline={false} as="div">
            Description
          </LabelAndValue>
        </>
      }
      editing={
        <>
          <MandatoryFields />
          <InputFormField
            data-testid="profile-firstName-input"
            control={form.control}
            path="firstName"
            label="Prénom"
            disabled={form.formState.isSubmitting}
            asterisk
            info={firstNameInfo}
          />
          <InputFormField
            data-testid="profile-lastName-input"
            control={form.control}
            path="lastName"
            label="Nom"
            disabled={form.formState.isSubmitting}
            asterisk
            info={lastNameInfo}
          />
          <SelectFormField
            data-testid="profile-department-select"
            control={form.control}
            disabled={form.formState.isSubmitting}
            path="department"
            label="Département"
            options={[
              { label: 'Selectionner une option', value: '', disabled: true },
              ...departmentsOptions,
            ]}
          />
          <RichInputFormField
            data-testid="profile-description-input"
            disabled={form.formState.isSubmitting}
            label="Description"
            form={form}
            path="description"
          />
        </>
      }
    />
  )
}

export default withTrpc(ProfileInformationsEdition)
