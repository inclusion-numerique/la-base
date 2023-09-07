import React from 'react'
import { SessionUser } from '@app/web/auth/sessionUser'
import { BaseResource } from '@app/web/server/bases/getBase'
import ResourceCard from '@app/web/components/Resource/Card'
import styles from './ResourceTab.module.css'

const ResourceTab = ({
  resources,
  user,
  emptyText,
  'data-testid': dataTestId,
}: {
  resources: BaseResource[]
  user: SessionUser
  emptyText: string
  ['data-testid']: string
}) => (
  <div data-testid={dataTestId}>
    {resources.length === 0 ? (
      <div className={styles.emptyBox}>{emptyText}</div>
    ) : (
      resources.map((resource) => (
        <ResourceCard key={resource.slug} resource={resource} user={user} />
      ))
    )}
  </div>
)

export default ResourceTab
