'use client'

import CroppedUploadModal from '@app/ui/components/CroppedUpload/CroppedUploadModal'
import EditImageButton from '@app/web/components/EditImageButton'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import {
  type UpdateProfileImageCommand,
  UpdateProfileImageCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import { trpc } from '@app/web/trpc'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import styles from './ProfileImageEdition.module.css'

const ProfileImageEditionModal = createModal({
  id: 'profile-picture-edition',
  isOpenedByDefault: false,
})

const ProfileImageEdition = ({ profile }: { profile: ProfilePageData }) => {
  const router = useRouter()

  const form = useForm<UpdateProfileImageCommand>({
    resolver: zodResolver(UpdateProfileImageCommandValidation),
    defaultValues: {
      imageId: profile.image?.id,
    },
  })

  const mutate = trpc.profile.updateImage.useMutation()

  return (
    <>
      <CroppedUploadModal
        key={profile.image?.id ?? 'empty'}
        form={form}
        path="imageId"
        title="Modifier la photo de profil"
        modal={ProfileImageEditionModal}
        label="Photo de profil"
        height={128}
        size={{ w: 384, h: 384 }}
        ratio={1}
        round
        onChange={async (imageId) => {
          if (imageId !== profile.image?.id) {
            await mutate.mutateAsync({
              imageId,
            })
          }
          router.refresh()
          ProfileImageEditionModal.close()
        }}
        emptyChildren={
          <RoundProfileImage
            user={{ ...profile, image: null }}
            size={128}
            borderWidth={1}
          />
        }
        image={profile.image}
      />
      <EditImageButton
        onClick={ProfileImageEditionModal.open}
        title="Modifier la photo de profil"
        className={styles.pictureModification}
      />
    </>
  )
}

export default withTrpc(ProfileImageEdition)
