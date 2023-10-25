'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { zodResolver } from '@hookform/resolvers/zod'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import EditCard from '@app/web/components/EditCard'
import { BasePageData } from '@app/web/server/bases/getBase'
import {
  UpdateBaseContactsCommand,
  UpdateBaseContactsCommandValidation,
} from '@app/web/server/bases/updateBase'
import MaybeEmptyValue from '@app/web/components/MaybeEmptyValue'
import BaseContactsEdition from '../BaseContactsEdition'
import editionStyles from './Edition.module.css'
import styles from './Contacts.module.css'

const Contacts = ({ base }: { base: BasePageData }) => {
  const form = useForm<UpdateBaseContactsCommand>({
    resolver: zodResolver(UpdateBaseContactsCommandValidation),
    defaultValues: {
      email: base.email,
      emailIsPublic: base.emailIsPublic,
      linkedin: base.linkedin || undefined,
      facebook: base.facebook || undefined,
      twitter: base.twitter || undefined,
      website: base.website || undefined,
    },
  })
  const mutate = trpc.base.mutate.useMutation()

  return (
    <EditCard
      id="contacts"
      mutation={async (data) => {
        await mutate.mutateAsync({ id: base.id, data })
      }}
      form={form}
      className="fr-mt-3w"
      title="Contacts"
      edition={<BaseContactsEdition form={form} />}
      view={
        <>
          <div className={styles.contacts}>
            <div className={classNames(styles.contactColumn, 'fr-mb-2w')}>
              <div className={editionStyles.label}>Adresse mail</div>
              <div
                className={editionStyles.value}
                data-testid="base-contacts-email"
              >
                <MaybeEmptyValue value={base.email} />
              </div>
            </div>
            <div className={classNames(styles.contactColumn, 'fr-mb-2w')}>
              <div className={editionStyles.label}>Site internet</div>
              <div
                className={editionStyles.value}
                data-testid="base-contacts-website"
              >
                <MaybeEmptyValue value={base.website} />
              </div>
            </div>
          </div>
          <div className={styles.contacts}>
            <div className={classNames(styles.contactColumn, 'fr-mb-2w')}>
              <div className={editionStyles.label}>LinkedIn</div>
              <div
                className={editionStyles.value}
                data-testid="base-contacts-linkedin"
              >
                <MaybeEmptyValue value={base.linkedin} />
              </div>
            </div>
            <div className={classNames(styles.contactColumn, 'fr-mb-2w')}>
              <div className={editionStyles.label}>Twitter</div>
              <div
                className={editionStyles.value}
                data-testid="base-contacts-twitter"
              >
                <MaybeEmptyValue value={base.twitter} />
              </div>
            </div>
          </div>
          <div className={styles.contacts}>
            <div className={styles.contactColumn}>
              <div className={editionStyles.label}>Facebook</div>
              <div
                className={editionStyles.value}
                data-testid="base-contacts-facebook"
              >
                <MaybeEmptyValue value={base.facebook} />
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}

export default withTrpc(Contacts)
