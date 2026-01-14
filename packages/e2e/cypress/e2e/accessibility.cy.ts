/**
 * Tests d'accessibilité automatisés (RGAA/WCAG 2.1 AA)
 * Utilise axe-core via cypress-axe pour vérifier la conformité
 */

import { givenBase } from '@app/e2e/support/given/givenBase'
import { givenCollection } from '@app/e2e/support/given/givenCollection'
import {
  createTestPublishResourceCommand,
  createTestResourceCommands,
} from '@app/e2e/support/given/givenResourceCommands'
import { givenUser } from '@app/e2e/support/given/givenUser'
import type { CreateResourceCommand } from '@app/web/server/resources/feature/CreateResource'
import type { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import type { PublishCommand } from '@app/web/server/resources/feature/PublishResource'

describe('Accessibilité - Pages critiques', () => {
  beforeEach(() => {
    // S'assurer que les styles DSFR sont chargés avant les tests
    cy.visit('/')
    cy.dsfrStylesShouldBeLoaded()
  })

  describe('Pages publiques', () => {
    it("Page d'accueil", () => {
      cy.visit('/')
      cy.checkAccessibility()
    })

    it('Page de recherche - ressources', () => {
      cy.visit('/rechercher/tout/ressources')
      cy.checkAccessibility()
    })

    it('Page de recherche - bases', () => {
      cy.visit('/rechercher/tout/bases')
      cy.checkAccessibility()
    })

    it('Page de recherche - profils', () => {
      cy.visit('/rechercher/tout/profils')
      cy.checkAccessibility()
    })
  })

  describe('Pages thématiques', () => {
    it('Page inclusion numérique', () => {
      cy.visit('/inclusion-numerique')
      cy.dsfrStylesShouldBeLoaded()
      cy.checkAccessibility()
    })

    it('Page culture numérique', () => {
      cy.visit('/culture-numerique')
      cy.dsfrStylesShouldBeLoaded()
      cy.checkAccessibility()
    })

    it('Page communs et souveraineté', () => {
      cy.visit('/communs-et-souverainete')
      cy.dsfrStylesShouldBeLoaded()
      cy.checkAccessibility()
    })

    it('Page numérique et environnement', () => {
      cy.visit('/numerique-et-environnement')
      cy.dsfrStylesShouldBeLoaded()
      cy.checkAccessibility()
    })
  })

  describe('Pages de contenu dynamique (avec fixtures)', () => {
    // Créer un utilisateur avec un profil complet
    const user = givenUser({
      isPublic: true,
      firstName: 'Marie',
      lastName: 'Dupont',
      title: 'Médiatrice numérique',
      description:
        "<p>Passionnée par l'inclusion numérique, j'accompagne les publics éloignés du numérique depuis 10 ans.</p><p>Je travaille actuellement sur des projets de médiation numérique dans les quartiers prioritaires.</p>",
      location: 'Lyon',
      department: '69',
      website: 'https://mariedupont.example.com',
      linkedin: 'marie-dupont',
      twitter: '@mariedupont',
      emailIsPublic: true,
    })

    // Créer des membres supplémentaires pour la base
    const member1 = givenUser({
      isPublic: true,
      firstName: 'Pierre',
      lastName: 'Martin',
      title: 'Coordinateur numérique',
      location: 'Paris',
    })
    const member2 = givenUser({
      isPublic: true,
      firstName: 'Sophie',
      lastName: 'Bernard',
      title: 'Animatrice numérique',
      location: 'Marseille',
    })

    let baseSlug: string
    let resourceSlug: string

    before(() => {
      cy.deleteAllData()

      // Créer tous les utilisateurs
      cy.createUser(user)
      cy.createUser(member1)
      cy.createUser(member2)

      // Créer une base publique avec description complète et plusieurs membres
      const base = givenBase(
        {
          createdById: user.id,
          isPublic: true,
          title: "Pôle d'inclusion numérique - Région Auvergne-Rhône-Alpes",
          description:
            "<p>Notre pôle accompagne les acteurs de l'inclusion numérique dans la région Auvergne-Rhône-Alpes.</p><p>Nous proposons des ressources, des formations et un accompagnement personnalisé pour développer vos compétences et vos projets.</p><p>Rejoignez notre communauté de plus de 200 professionnels engagés !</p>",
          department: '69',
          email: 'contact@pole-inclusion-ara.fr',
          emailIsPublic: true,
          website: 'https://pole-inclusion-ara.fr',
          facebook: 'pole.inclusion.ara',
          twitter: '@PoleInclusionARA',
          linkedin: 'pole-inclusion-ara',
        },
        { acceptedMemberIds: [member1.id, member2.id] },
      )
      baseSlug = base.slug
      cy.createBase(base)

      // Créer une ressource publique riche avec plusieurs types de contenu
      const resourceCommands = createTestResourceCommands({ baseId: base.id })
      const resourceId = resourceCommands[0].payload.resourceId
      resourceSlug =
        'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes'

      // Ajouter plus de contenu à la ressource
      const enrichedCommands = [
        ...resourceCommands,
        {
          name: 'AddContent',
          payload: {
            order: 4,
            resourceId,
            type: 'SectionTitle',
            title: 'Deuxième section avec plus de contenu',
          },
        },
        {
          name: 'AddContent',
          payload: {
            order: 5,
            resourceId,
            type: 'Text',
            text: '<p>Voici un deuxième paragraphe avec <strong>du texte en gras</strong>, <em>en italique</em> et même <a href="https://example.com">un lien externe</a>.</p><ul><li>Premier élément de liste</li><li>Deuxième élément de liste</li><li>Troisième élément de liste</li></ul>',
          },
        },
        {
          name: 'AddContent',
          payload: {
            order: 6,
            resourceId,
            type: 'Link',
            title: "Guide pratique de l'inclusion numérique",
            url: 'https://guide-inclusion-numerique.fr',
            showPreview: true,
            caption:
              "Un guide complet pour accompagner vos publics vers l'autonomie numérique",
          },
        },
        {
          name: 'AddContent',
          payload: {
            order: 7,
            resourceId,
            type: 'SectionTitle',
            title: 'Ressources complémentaires',
          },
        },
        {
          name: 'AddContent',
          payload: {
            order: 8,
            resourceId,
            type: 'Text',
            text: '<p>Pour aller plus loin, nous vous recommandons de consulter les ressources suivantes :</p>',
          },
        },
        {
          name: 'AddContent',
          payload: {
            order: 9,
            resourceId,
            type: 'Link',
            title: 'Formation à la médiation numérique',
            url: 'https://formation-mediation.fr',
            showPreview: false,
          },
        },
        createTestPublishResourceCommand(resourceId, true),
      ] satisfies [
        CreateResourceCommand,
        ...ResourceMutationCommand[],
        PublishCommand,
      ]

      cy.sendResourceCommands({
        commands: enrichedCommands,
        user: { id: user.id },
      })

      // Créer une collection publique
      const collection = givenCollection({
        createdById: user.id,
        isPublic: true,
        title: 'Ressources essentielles pour débuter',
        description:
          "<p>Une sélection de ressources incontournables pour les acteurs de l'inclusion numérique.</p><p>Ces ressources couvrent les bases de la médiation numérique et les outils essentiels.</p>",
      })
      cy.createCollection(collection)
    })

    describe('Pages de base', () => {
      it("Page de détail d'une base", () => {
        cy.visit(`/bases/${baseSlug}`)
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })
    })

    describe('Pages de ressource', () => {
      it("Page de détail d'une ressource", () => {
        cy.visit(`/ressources/${resourceSlug}`)
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })
    })

    describe('Pages de profil', () => {
      it("Page de détail d'un profil", () => {
        cy.visit(`/profils/${user.slug}`)
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })

      it("Page des collections d'un profil", () => {
        cy.visit(`/profils/${user.slug}/collections`)
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })
    })
  })

  describe('Pages authentifiées (avec fixtures)', () => {
    // Créer un utilisateur avec un profil complet pour les pages d'édition
    // et des préférences de fil d'actualité qui matchent les ressources créées
    const user = givenUser({
      isPublic: true,
      firstName: 'Thomas',
      lastName: 'Rousseau',
      title: 'Responsable inclusion numérique',
      description:
        '<p>Expert en transformation numérique et inclusion, je coordonne des projets territoriaux depuis 5 ans.</p>',
      location: 'Toulouse',
      department: '31',
      website: 'https://thomas-rousseau.example.com',
      linkedin: 'thomas-rousseau',
      emailIsPublic: true,
      newsFeed: {
        create: {
          // Les thèmes et secteurs doivent correspondre aux ressources publiées
          // pour éviter l'erreur "Cannot read properties of undefined (reading 'count')"
          themes: ['AidesAuxDemarchesAdministratives'],
          professionalSectors: ['AidantsEtMediateursNumeriques'],
          hasCompleteOnboarding: true,
          created: new Date('2023-01-01').toISOString(),
          updated: new Date('2023-01-01').toISOString(),
          monthlyNewsletter: false,
        },
      },
    })

    // Utilisateur séparé pour l'onboarding (hasCompleteOnboarding: false)
    const userForOnboarding = givenUser({
      isPublic: true,
      firstName: 'Alice',
      lastName: 'Durand',
      newsFeed: {
        create: {
          themes: [],
          professionalSectors: [],
          hasCompleteOnboarding: false,
          created: new Date('2023-01-01').toISOString(),
          updated: new Date('2023-01-01').toISOString(),
          monthlyNewsletter: false,
        },
      },
    })

    let resourceSlug: string

    before(() => {
      cy.deleteAllData()

      cy.createUser(user)
      cy.createUser(userForOnboarding)

      const base = givenBase({
        createdById: user.id,
        isPublic: true,
        title: 'Hub numérique de Toulouse Métropole',
        description:
          '<p>Le Hub numérique accompagne les habitants et les professionnels dans leurs usages numériques.</p><p>Nous proposons des ateliers, des permanences et des ressources pour tous les niveaux.</p>',
        department: '31',
        email: 'contact@hub-toulouse.fr',
        emailIsPublic: true,
        website: 'https://hub-toulouse.fr',
      })
      cy.createBase(base)

      const resourceCommands = createTestResourceCommands({ baseId: base.id })
      const resourceId = resourceCommands[0].payload.resourceId
      resourceSlug =
        'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes'

      const enrichedCommands = [
        ...resourceCommands,
        {
          name: 'AddContent',
          payload: {
            order: 4,
            resourceId,
            type: 'Text',
            text: "<p>Contenu supplémentaire pour tester l'édition complète d'une ressource.</p>",
          },
        },
      ] satisfies [CreateResourceCommand, ...ResourceMutationCommand[]]

      cy.sendResourceCommands({
        commands: enrichedCommands,
        user: { id: user.id },
      })

      // Créer une ressource publiée pour le fil d'actualité
      // avec des thèmes qui matchent les préférences de l'utilisateur
      const publishedResourceCommands = createTestResourceCommands({
        baseId: base.id,
      })
      const publishedResourceId =
        publishedResourceCommands[0].payload.resourceId
      // Override le titre pour éviter le conflit de slug
      publishedResourceCommands[0].payload.title =
        "Guide pratique de l'inclusion numérique"

      const publishedCommands = [
        ...publishedResourceCommands,
        createTestPublishResourceCommand(publishedResourceId, true),
      ] satisfies [
        CreateResourceCommand,
        ...ResourceMutationCommand[],
        PublishCommand,
      ]

      cy.sendResourceCommands({
        commands: publishedCommands,
        user: { id: user.id },
      })
    })

    beforeEach(() => {
      cy.signin(user)
    })

    // describe('Création de base', () => {
    //   it.only('Page de création d\'une base', () => {
    //     cy.visit('/bases/creer')
    //     cy.dsfrStylesShouldBeLoaded()
    //     cy.checkAccessibility()
    //   })
    // })

    describe('Édition de ressource', () => {
      it("Page d'édition d'une ressource", () => {
        cy.visit(`/ressources/${resourceSlug}/editer`)
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })

      it("Page de publication d'une ressource", () => {
        cy.visit(`/ressources/${resourceSlug}/publier`)
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })
    })

    describe('Édition de profil', () => {
      it("Page de modification d'un profil", () => {
        cy.visit(`/profils/${user.slug}/modifier`)
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })
    })

    describe("Fil d'actualité", () => {
      it("Page d'onboarding des thèmes", () => {
        cy.signin(userForOnboarding)
        cy.visit('/fil-d-actualite/onboarding/themes')
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })

      it("Page d'onboarding des bases", () => {
        cy.signin(userForOnboarding)
        cy.visit('/fil-d-actualite/onboarding/bases')
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })

      it("Page d'onboarding des themes", () => {
        cy.signin(userForOnboarding)
        cy.visit('/fil-d-actualite/onboarding/themes')
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })

      it("Page d'onboarding des secteurs professionnels", () => {
        cy.signin(userForOnboarding)
        cy.visit('/fil-d-actualite/onboarding/secteurs-professionnels')
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })

      it("Page du fil d'actualité complet", () => {
        cy.visit('/fil-d-actualite/tout')
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })

      it("Page des préférences du fil d'actualité", () => {
        cy.visit('/fil-d-actualite/preferences')
        cy.dsfrStylesShouldBeLoaded()
        cy.checkAccessibility()
      })
    })
  })

  describe('Éléments de navigation', () => {
    it('Le header est accessible', () => {
      cy.visit('/')
      cy.checkAccessibility('header')
    })

    it('Le footer est accessible', () => {
      cy.visit('/')
      cy.checkAccessibility('footer')
    })

    it('Les skip links sont présents et fonctionnels', () => {
      cy.visit('/')
      cy.dsfrShouldBeStarted()
      // Les skip links DSFR sont dans une nav avec classe fr-skiplinks
      cy.get('.fr-skiplinks').should('exist')
      // Vérifier que les liens pointent vers les bons ids
      cy.get('.fr-skiplinks a[href="#contenu"]').should('exist')
      cy.get('.fr-skiplinks a[href="#fr-footer"]').should('exist')
    })
  })

  // describe('Formulaires', () => {
  //   it('Page de connexion', () => {
  //     cy.visit('/connexion')
  //     cy.dsfrStylesShouldBeLoaded()
  //     cy.checkAccessibility()
  //   })
  // })

  // describe('Vérifications spécifiques RGAA', () => {
  //   it('La page a un titre unique (critère 8.5)', () => {
  //     cy.visit('/')
  //     cy.title().should('not.be.empty')
  //   })

  //   it('La langue de la page est définie (critère 8.3)', () => {
  //     cy.visit('/')
  //     cy.get('html').should('have.attr', 'lang', 'fr')
  //   })

  //   it('Il y a exactement un h1 par page (critère 9.1)', () => {
  //     cy.visit('/')
  //     cy.get('h1').should('have.length', 1)
  //   })

  //   it('Les images ont des alternatives (critère 1.1)', () => {
  //     cy.visit('/')
  //     // Vérifier que toutes les images ont un alt ou sont décoratives
  //     cy.get('img').each(($img) => {
  //       const hasAlt = $img.attr('alt') !== undefined
  //       const isDecorative =
  //         $img.attr('role') === 'presentation' ||
  //         $img.attr('aria-hidden') === 'true'
  //       expect(hasAlt || isDecorative).to.be.true
  //     })
  //   })

  //   it('La structure des titres est cohérente (critère 9.1)', () => {
  //     cy.visit('/')
  //     // Vérifier qu'il n'y a pas de saut de niveau de titre
  //     cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
  //       let previousLevel = 0
  //       $headings.each((_, heading) => {
  //         const currentLevel = Number.parseInt(heading.tagName[1], 10)
  //         // Le premier titre peut être n'importe quel niveau (généralement h1)
  //         if (previousLevel > 0) {
  //           // On ne doit pas sauter plus d'un niveau
  //           expect(currentLevel).to.be.at.most(previousLevel + 1)
  //         }
  //         previousLevel = currentLevel
  //       })
  //     })
  //   })

  //   it('Les éléments interactifs sont accessibles au clavier (critère 12.13)', () => {
  //     cy.visit('/')
  //     // Vérifier que les boutons et liens sont focusables
  //     cy.get('button:visible, a:visible').first().focus()
  //     cy.focused().should('exist')
  //   })

  //   it('Le focus est visible (critère 10.7)', () => {
  //     cy.visit('/')
  //     cy.get('a:visible').first().focus()
  //     cy.focused().should('have.css', 'outline-style').and('not.equal', 'none')
  //   })
  // })
})
