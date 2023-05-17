'use client'

import classNames from 'classnames'
import { User } from 'next-auth'
import Link from 'next/link'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import PublishedInInformation from '../PublishedInInformation'
import ResourceContents from './ResourceContents'
import ResourceInformations from './ResourceInformations'
import ResourceNavigation from './ResourceNavigation'
import ResourcePublicStateBadge from './ResourcePublicStateBadge'
import styles from './View.module.css'

const constructRef = (
  resource: Resource,
): Record<string, React.RefObject<HTMLDivElement>> => {
  const refs: Record<string, React.RefObject<HTMLDivElement>> = {}
  for (const section of resource.contents.filter(
    (content) => content.type === 'SectionTitle',
  )) {
    refs[section.id] = createRef<HTMLDivElement>()
  }
  return refs
}

const View = ({
  resource,
  user,
}: {
  resource: Resource
  user: User | null
}) => {
  const contentRefs = useRef(constructRef(resource))

  const informationsRef = useRef<HTMLDivElement>(null)
  const [visibleRefIndex, setVisibleRefIndex] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!contentRefs.current) {
        setVisibleRefIndex(null)
        return
      }

      if (informationsRef.current) {
        const { bottom } = informationsRef.current.getBoundingClientRect()
        if (bottom < window.innerHeight) {
          setVisibleRefIndex(-1)
          return
        }
      }

      const index = Object.values(contentRefs.current).findIndex((ref) => {
        if (!ref.current) {
          return false
        }

        const { bottom } = ref.current.getBoundingClientRect()
        return bottom > 128
      })

      setVisibleRefIndex(index)
    }

    onScroll()
    document.addEventListener('scroll', onScroll, true)
    return () => document.removeEventListener('scroll', onScroll, true)
  }, [])

  return (
    <>
      <div className="fr-grid-row">
        <div className="fr-col-12 fr-col-lg-8">
          <PublishedInInformation resource={resource} />
        </div>
        <div className={styles.headerSeparator}>
          <hr />
        </div>
        <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-3">
          {user ? (
            <ResourcePublicStateBadge isPublic={resource.isPublic} />
          ) : (
            <p className={classNames('fr-text--xs', 'fr-mb-0', styles.user)}>
              Créé par{' '}
              <Link href="/" className="fr-text--xs fr-link">
                {resource.createdBy.name}
              </Link>
            </p>
          )}
        </div>
      </div>

      <div className="fr-grid-row fr-mt-8v">
        <div className="fr-col-12 fr-col-lg-8">
          <hr />
        </div>
        <div className="fr-col-0 fr-col-offset-lg-1 fr-col-lg-3">
          <hr />
        </div>
      </div>

      <div className="fr-grid-row" style={{ flexDirection: 'row-reverse' }}>
        <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-3">
          <ResourceNavigation
            resource={resource}
            user={user}
            visibleRefIndex={visibleRefIndex}
          />
        </div>
        <div className="fr-col-12 fr-col-lg-8">
          <ResourceContents
            resource={resource}
            contentRefs={contentRefs}
            visibleRefIndex={visibleRefIndex}
          />
          <div ref={informationsRef}>
            <ResourceInformations />
          </div>
        </div>
      </div>
    </>
  )
}

export default View
