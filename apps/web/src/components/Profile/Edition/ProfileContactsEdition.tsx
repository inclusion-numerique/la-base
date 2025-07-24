'use client'

import CheckboxFormField from '@app/ui/components/Form/CheckboxFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import EditableCardForm from '@app/web/components/EditableCardForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import {
  type UpdateProfileContactsCommand,
  UpdateProfileContactsCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import { trpc } from '@app/web/trpc'
import { LabelAndValue } from '@app/web/ui/LabelAndValue'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const lastPartFromUrl = (url: string | null): string | undefined =>
  url?.replace(/\/+$/, '').split('/').at(-1)

const ProfileContactsEdition = ({ profile }: { profile: ProfilePageData }) => {
  const form = useForm<UpdateProfileContactsCommand>({
    resolver: zodResolver(UpdateProfileContactsCommandValidation),
    defaultValues: {
      emailIsPublic: profile.emailIsPublic ?? false,
      website: profile.website ?? '',
      facebook: profile.facebook ?? '',
      twitter: profile.twitter ?? '',
      linkedin: profile.linkedin ?? '',
    },
  })

  const mutate = trpc.profile.updateContacts.useMutation()

  const handleSave = async (data: UpdateProfileContactsCommand) => {
    await mutate.mutateAsync(data)
  }

  return (
    <EditableCardForm
      id="contacts"
      title="Vos contacts"
      form={form}
      onSave={handleSave}
      preview={
        <div className="fr-grid-row">
          <LabelAndValue
            className="fr-mb-2w fr-col-12 fr-col-md-6 fr-text--break-all"
            defaultValue="-"
            value={profile.email}
            inline={false}
            as="div"
          >
            Adresse mail
          </LabelAndValue>
          <LabelAndValue
            className="fr-mb-2w fr-col-12 fr-col-md-6 fr-text--break-all"
            defaultValue="-"
            value={profile.website}
            inline={false}
            as="div"
          >
            Site internet
          </LabelAndValue>
          <LabelAndValue
            className="fr-mb-2w fr-col-12 fr-col-md-6 fr-text--break-all"
            defaultValue="-"
            value={
              lastPartFromUrl(profile.facebook) &&
              `@${lastPartFromUrl(profile.facebook)}`
            }
            inline={false}
            as="div"
          >
            Facebook
          </LabelAndValue>
          <LabelAndValue
            className="fr-mb-2w fr-col-12 fr-col-md-6 fr-text--break-all"
            defaultValue="-"
            value={
              lastPartFromUrl(profile.twitter) &&
              `@${lastPartFromUrl(profile.twitter)}`
            }
            inline={false}
            as="div"
          >
            X (Twitter)
          </LabelAndValue>
          <LabelAndValue
            className="fr-mb-2w fr-col-12 fr-col-md-6 fr-text--break-all"
            defaultValue="-"
            value={
              lastPartFromUrl(profile.linkedin) &&
              `@${lastPartFromUrl(profile.linkedin)}`
            }
            inline={false}
            as="div"
          >
            LinkedIn
          </LabelAndValue>
        </div>
      }
      editing={
        <>
          <div className="fr-input-group fr-input-group--disabled">
            <label className="fr-label fr-mb-1v" htmlFor="profile-email-input">
              Adresse mail
            </label>
            <input
              id="profile-email-input"
              className="fr-input"
              type="email"
              value={profile.email}
              disabled
            />
          </div>
          <div className="fr-input-group">
            <CheckboxFormField
              data-testid="profile-email-public-checkbox"
              control={form.control}
              path="emailIsPublic"
              disabled={form.formState.isSubmitting}
              label="Je veux pouvoir être contacté par les visiteurs de la plateforme"
            />
          </div>
          <InputFormField
            data-testid="profile-website-input"
            control={form.control}
            path="website"
            label="Site internet"
            disabled={form.formState.isSubmitting}
          />
          <InputFormField
            data-testid="profile-facebook-input"
            control={form.control}
            path="facebook"
            label="Facebook"
            disabled={form.formState.isSubmitting}
          />
          <InputFormField
            data-testid="profile-twitter-input"
            control={form.control}
            path="twitter"
            label="X (Twitter)"
            disabled={form.formState.isSubmitting}
          />
          <InputFormField
            data-testid="profile-linkedin-input"
            control={form.control}
            path="linkedin"
            label="LinkedIn"
            className="fr-mb-4w"
            disabled={form.formState.isSubmitting}
          />
        </>
      }
    />
  )
}

export default withTrpc(ProfileContactsEdition)
