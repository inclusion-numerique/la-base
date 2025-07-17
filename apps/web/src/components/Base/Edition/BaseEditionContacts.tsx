'use client'

import MaybeEmptyValue from '@app/ui/components/MaybeEmptyValue'
import EditCard from '@app/web/components/EditCard'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { BasePageData } from '@app/web/server/bases/getBase'
import {
  type UpdateBaseContactsCommand,
  UpdateBaseContactsCommandValidation,
} from '@app/web/server/bases/updateBase'
import { trpc } from '@app/web/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form'
import BaseContactsEdition from '../BaseContactsEdition'
import styles from './BaseEditionContacts.module.css'

const BaseEditionContacts = ({ base }: { base: BasePageData }) => {
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
      noBorder
      id="contacts"
      mutation={async (data) => {
        await mutate.mutateAsync({ id: base.id, data })
      }}
      form={form}
      className="fr-mt-3w"
      title="Contacts de la base"
      titleAs="h2"
      edition={<BaseContactsEdition form={form} />}
      view={
        <>
          <div className={styles.contacts}>
            <div className={classNames(styles.contactColumn, 'fr-mb-2w')}>
              <div className="fr-text-mention--grey">Adresse mail</div>
              <div
                className="fr-text-label--grey fr-text--medium"
                data-testid="base-contacts-email"
              >
                <MaybeEmptyValue value={base.email} />
              </div>
            </div>
            <div className={classNames(styles.contactColumn, 'fr-mb-2w')}>
              <div className="fr-text-mention--grey">Site internet</div>
              <div
                className="fr-text-label--grey fr-text--medium"
                data-testid="base-contacts-website"
              >
                <MaybeEmptyValue value={base.website} />
              </div>
            </div>
          </div>
          <div className={styles.contacts}>
            <div className={classNames(styles.contactColumn, 'fr-mb-2w')}>
              <div className="fr-text-mention--grey">LinkedIn</div>
              <div
                className="fr-text-label--grey fr-text--medium"
                data-testid="base-contacts-linkedin"
              >
                <MaybeEmptyValue value={base.linkedin} />
              </div>
            </div>
            <div className={classNames(styles.contactColumn, 'fr-mb-2w')}>
              <div className="fr-text-mention--grey">Twitter</div>
              <div
                className="fr-text-label--grey fr-text--medium"
                data-testid="base-contacts-twitter"
              >
                <MaybeEmptyValue value={base.twitter} />
              </div>
            </div>
          </div>
          <div className={styles.contacts}>
            <div className={styles.contactColumn}>
              <div className="fr-text-mention--grey">Facebook</div>
              <div
                className="fr-text-label--grey fr-text--medium"
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

export default withTrpc(BaseEditionContacts)
