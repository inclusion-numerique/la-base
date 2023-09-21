import React from 'react'
import Link from 'next/link'
import IconLink from '@app/web/components/Icon/IconLink'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { BaseMember } from '@app/web/server/bases/getBase'
import styles from './MemberCard.module.css'

const MemberCard = ({ member }: { member: BaseMember }) => (
  <div className={styles.container} data-testid="member-card">
    <Link className={styles.content} href={`/profils/${member.member.id}`}>
      <div className={styles.logo} />
      {member.member.name}
    </Link>
    <div className={styles.iconActions}>
      <IconLink
        title="Mettre en favoris"
        href="/"
        icon="fr-icon-heart-line"
        small
      />
      <CopyLinkButton
        url={getServerUrl(`/profils/${member.member.id}`, true)}
      />
    </div>
  </div>
)

export default MemberCard
