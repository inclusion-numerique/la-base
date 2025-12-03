import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'
import { NewsFeedResourceServer } from '@app/web/server/newsFeed/getNewsFeedResources'
import {
  MjmlButton,
  MjmlColumn,
  MjmlImage,
  MjmlSection,
  MjmlText,
} from '@faire/mjml-react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import React from 'react'

export const newsFeedNewsletter = {
  text: (): string =>
    `Résumé mensuel des dernières publications lié à vos préférences`,
  mjml: ({
    count,
    resources,
  }: {
    count: number
    resources: NewsFeedResourceServer[]
  }): string =>
    renderToMjml(
      <LayoutWithFooter
        title="Résumé mensuel des dernières publications lié à vos préférences"
        preview="Résumé mensuel des dernières publications lié à vos préférences"
      >
        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlText fontSize="22px" fontWeight="700" color="#000091">
              Résumé mensuel des dernières publications lié à vos préférences
            </MjmlText>
            <MjmlText fontSize="18px" paddingBottom="0">
              Ce mois-ci, découvrez {count} nouvelles ressources liés à vos
              préférences publiées sur Les Bases.
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>

        {resources.map((resource) => (
          <React.Fragment key={resource.id}>
            <MjmlSection
              paddingTop="16px"
              paddingBottom="0"
              borderTop="1px solid #ddd"
            >
              <MjmlColumn>
                <MjmlText fontSize="12px" color="#666666" paddingBottom="4px">
                  {resource.base ? (
                    <>
                      Publiée dans la base{' '}
                      <a
                        href={emailAssetUrl(`/bases/${resource.base.slug}`)}
                        style={{
                          color: '#000091',
                          textDecoration: 'underline',
                        }}
                      >
                        {resource.base.title}
                      </a>{' '}
                      par{' '}
                      <a
                        href={emailAssetUrl(
                          `/profils/${resource.createdBy.slug}`,
                        )}
                        style={{
                          color: '#000091',
                          textDecoration: 'underline',
                        }}
                      >
                        {resource.createdBy.firstName}{' '}
                        {resource.createdBy.lastName}
                      </a>
                    </>
                  ) : (
                    <>
                      Publiée par{' '}
                      <a
                        href={emailAssetUrl(
                          `/profils/${resource.createdBy.slug}`,
                        )}
                        style={{
                          color: '#000091',
                          textDecoration: 'underline',
                        }}
                      >
                        {resource.createdBy.firstName}{' '}
                        {resource.createdBy.lastName}
                      </a>
                    </>
                  )}
                </MjmlText>
                <MjmlText fontSize="12px" color="#666666" paddingBottom="8px">
                  {new Date(
                    resource.updated ?? resource.published,
                  ).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </MjmlText>
              </MjmlColumn>
            </MjmlSection>
            <MjmlSection paddingTop="0" paddingBottom="32px">
              <MjmlColumn width={resource.image ? '70%' : '100%'}>
                <MjmlText
                  fontSize="18px"
                  fontWeight="600"
                  color="#161616"
                  paddingBottom="8px"
                >
                  <a
                    href={emailAssetUrl(`/ressources/${resource.slug}`)}
                    style={{ color: '#161616', textDecoration: 'none' }}
                  >
                    {resource.title}
                  </a>
                </MjmlText>
                <MjmlText
                  fontSize="14px"
                  color="#3a3a3a"
                  paddingBottom="16px"
                  lineHeight="1.5"
                >
                  {resource.excerpt}
                </MjmlText>
              </MjmlColumn>
              {resource.image && (
                <MjmlColumn width="30%" verticalAlign="top">
                  <MjmlImage
                    src={emailAssetUrl(
                      `/images/${resource.image.id}.webp?width=180&quality=80`,
                    )}
                    alt={resource.image.altText ?? ''}
                    width="180px"
                    height="130px"
                    paddingLeft="16px"
                  />
                </MjmlColumn>
              )}
            </MjmlSection>
          </React.Fragment>
        ))}
        <MjmlSection>
          <MjmlColumn>
            <MjmlButton
              href={emailAssetUrl('/fil-d-actualite/tout')}
              width="100%"
            >
              Voir plus
            </MjmlButton>
          </MjmlColumn>
        </MjmlSection>

        <MjmlSection>
          <MjmlColumn>
            <MjmlText color="#000091" fontSize="22px" fontWeight="700">
              Modifier à tout moment vos préférences
            </MjmlText>
            <MjmlText fontSize="18px">
              Suivez de nouvelles bases, profils, thématiques afin de continuez
              à découvrir les ressources qui vous intéressent.
            </MjmlText>
            <MjmlButton
              href={emailAssetUrl('/fil-d-actualite/preferences')}
              width="100%"
            >
              Gérer mes préférences
            </MjmlButton>
            <MjmlText align="center" color="#000091">
              <a
                href={emailAssetUrl('/fil-d-actualite/preferences')}
                style={{ color: '#000091', textDecoration: 'underline' }}
              >
                Je ne souhaite plus recevoir ce mail
              </a>
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </LayoutWithFooter>,
    ),
}
