import React from 'react'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import { sPluriel } from '@app/web/utils/sPluriel'
import ProfileCard from '../Profile/Card/Card'
import EmptyBox from '../EmptyBox'
import styles from './Content.module.css'

const Profiles = ({
  profiles,
  totalCount,
}: {
  profiles: ProfileListItem[]
  totalCount: number
}) => (
  <>
    <div className={styles.header}>
      <p className="fr-text--lg fr-mb-0">
        <b>
          {totalCount} Profil{sPluriel(totalCount)}
        </b>
      </p>
      <div className={styles.select}>
        Trier par :
        <select>
          <option>Les plus pertinents</option>
        </select>
      </div>
    </div>
    {profiles.length > 0 ? (
      profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))
    ) : (
      <EmptyBox title="Aucun résultat pour votre recherche">
        Veuillez réessayer avec différents mots-clés.
      </EmptyBox>
    )}
  </>
)

export default Profiles
