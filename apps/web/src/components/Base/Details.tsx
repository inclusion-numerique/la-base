import React from 'react'
import Link from 'next/link'
import sanitizeHtml from 'sanitize-html'
import { BasePageData } from '@app/web/server/bases/getBase'
import { getDepartmentName } from '@app/web/utils/departments'
import styles from './Details.module.css'

const Details = ({ base }: { base: BasePageData }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h3 className="fr-mb-0">À propos</h3>
    </div>
    <hr />
    <div className="fr-grid-row fr-grid-row--gutters fr-mb-4w">
      <div className="fr-col-12 fr-col-lg-8 fr-mt-3w">
        <h6>Informations</h6>
        <div>
          <p className={styles.subtitle}>Description</p>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(base.description || 'Pas de description'),
            }}
          />
        </div>
        {base.department && (
          <div className="fr-mt-3w">
            <p className={styles.subtitle}>Département</p>
            {getDepartmentName(base.department)}
          </div>
        )}
      </div>
      <div className="fr-col-12 fr-col-lg-4 fr-mt-3w">
        <h6 className="fr-mb-2w">Contact</h6>
        <div>
          <p className={styles.subtitle}>Adresse mail de contact</p>
          <Link href={`mailto:${base.email}`} className="fr-link">
            {base.email}
          </Link>
        </div>
        {base.website && (
          <div className="fr-mt-2w">
            <p className={styles.subtitle}>Site internet</p>
            <Link href={`mailto:${base.website}`} className="fr-link">
              {base.website}
            </Link>
          </div>
        )}
        {(base.facebook || base.twitter || base.linkedin) && (
          <>
            <h6 className="fr-mt-3w fr-mb-2w">Nous suivre</h6>
            <div className={styles.websites}>
              {base.twitter && (
                <Link href={base.twitter} className="fr-link ">
                  <span className="fr-icon--sm fr-icon-twitter-fill fr-mr-1w" />
                  Twitter
                </Link>
              )}
              {base.linkedin && (
                <Link href={base.linkedin} className="fr-link ">
                  <span className="fr-icon--sm fr-icon-linkedin-box-fill fr-mr-1w" />
                  LinkedIn
                </Link>
              )}
              {base.facebook && (
                <Link href={base.facebook} className="fr-link ">
                  <span className="fr-icon--sm fr-icon-facebook-circle-fill fr-mr-1w" />
                  Facebook
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
)

export default Details
