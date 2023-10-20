'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CroppedUploadModal from '@app/ui/components/CroppedUpload/CroppedUploadModal'
import { useRouter } from 'next/navigation'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { FilteredProfile } from '@app/web/server/profiles/authorization'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import {
  UpdateProfileImageCommand,
  UpdateProfileImageCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import RoundProfileImage from '../../RoundProfileImage'
import EditImageButton from '../../EditImageButton'
import styles from './ImageEdition.module.css'

const ImageEdition = ({
  profile,
}: {
  profile: ProfilePageData | FilteredProfile
}) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
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
        form={form}
        path="imageId"
        open={open}
        onClose={() => setOpen(false)}
        label="de profil"
        height={128}
        ratio={1}
        round
        onChange={async (imageId) => {
          if (imageId !== profile.image?.id) {
            await mutate.mutateAsync({
              imageId,
            })
          }
          router.refresh()
          setOpen(false)
        }}
        emptyChildren={
          <RoundProfileImage
            user={{ ...profile, image: null }}
            size={128}
            borderWidth={1}
          />
        }
        initialImageId={profile.image ? profile.image.id : ''}
      />
      <EditImageButton
        onClick={() => setOpen(true)}
        title="Modifier la photo de profil"
        className={styles.pictureModification}
      />
    </>
  )
}

export default withTrpc(ImageEdition)