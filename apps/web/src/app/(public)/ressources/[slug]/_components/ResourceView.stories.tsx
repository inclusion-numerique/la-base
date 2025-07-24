import { mobileStory } from '@app/storybook/storyHelper'
import { generateResourceExcerpt } from '@app/web/resources/resourceExcerpt'
import type {
  Resource,
  ResourceContent,
} from '@app/web/server/resources/getResource'
import { ResourceLicence } from '@prisma/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import ResourceView from './ResourceView'

const description =
  'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae turpis sed vitae vel. Venenatis adipiscing elit.'

const past = new Date('1998-07-12')
const present = new Date('2022-07-12')

const resource = (imageId: string | null) =>
  ({
    id: '1',
    legacyId: null,
    title:
      'Titre d’une ressource sur deux ligne très longues comme comme sur deux ligne très longues',
    slug: 'titre-d-une-ressource-sur-deux-ligne-très-longues-comme-comme-sur-deux-ligne-très-longues',
    description,
    licence: ResourceLicence.ETALAB_2_0,
    excerpt: generateResourceExcerpt(description),
    created: past,
    updated: present,
    published: present,
    lastPublished: present,
    deleted: null,
    baseId: '2',
    base: {
      id: '2',
      title:
        'Titre de la base particulièrement long au point de revenir à la ligne',
      slug: 'titre-de-la-base',
      isPublic: true,
      members: [],
      image: null,
    },
    createdById: '1',
    createdBy: {
      email: 'jean.biche@example.com',
      id: '1',
      name: 'Nom_utilisateur long long vraiment long tellement long',
      slug: 'nom_utilisateur_long_long_vraiment_long_tellement_long',
      firstName: 'Prénom',
      lastName: 'Nom',
      isPublic: true,
      image: null,
    },
    imageId,
    image: imageId
      ? { id: imageId, altText: "C'est beau la Nouvelle Zélande" }
      : null,
    themes: [
      'Accessibilite',
      'AidesAuxDemarchesAdministratives',
      'ReseauxSociauxEtCommunication',
      'TerritoiresConnectesEtDurables',
    ],
    beneficiaries: [],
    professionalSectors: ['AutresProfessionnels'],
    resourceTypes: [],
    contributors: [],
    contents: [
      {
        id: '1',
        type: 'Text',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies gravida posuere. Nulla ullamcorper ipsum nisi, sed volutpat arcu fringilla eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis risus sit amet arcu mattis sagittis. Vestibulum gravida vel leo ac mollis. Ut ex felis, maximus in accumsan sit amet, pharetra id dolor. Nam sollicitudin nunc massa, et mollis libero rutrum ut. Curabitur ultrices, augue quis convallis laoreet, sapien mauris dignissim mauris, quis ullamcorper massa magna a felis. Morbi mollis ullamcorper tellus quis dignissim. Praesent tempor eros porta odio tempus, a pretium quam elementum. Donec varius mi lobortis elit cursus hendrerit.',
      },
      {
        id: '2',
        type: 'SectionTitle',
        title: 'Un premier titre de section',
        text: null,
      },
      {
        id: '3',
        type: 'Text',
        text: 'Praesent sed felis quis lacus auctor dignissim. Sed vestibulum maximus metus ac porta. Vivamus vel laoreet leo. Sed vitae ligula vel metus luctus finibus. Donec elementum euismod nulla. Proin sodales sed urna sit amet tempor. Donec iaculis ligula justo, eu tincidunt ante iaculis quis. Fusce pretium purus dui. Morbi luctus diam ligula, eget vestibulum massa porta sed. Mauris eleifend odio euismod tortor vehicula, quis tempus lorem vulputate. Praesent dictum magna quis arcu aliquet, et pretium libero auctor. Etiam ut fringilla libero. Pellentesque sed odio porttitor, convallis est sit amet, tincidunt purus. Aenean placerat urna magna, nec bibendum arcu accumsan nec. Curabitur porttitor odio sit amet facilisis pellentesque. Sed commodo, velit eu porta consectetur, nisl metus sodales velit, in hendrerit tortor risus sed velit.',
      },
      {
        id: '4',
        type: 'Text',
        text: 'In et enim posuere, viverra justo ac, vestibulum ligula. Duis sollicitudin laoreet molestie. Duis interdum mauris dui, in pharetra dolor dignissim vitae. Cras facilisis facilisis ex. Suspendisse libero sapien, mollis a libero sit amet, placerat egestas tortor. Proin molestie est erat, non blandit enim volutpat a. Cras lacinia ante et ipsum vestibulum ultricies. Morbi pharetra iaculis congue. Quisque ut nisi orci. Pellentesque ullamcorper id ante nec vehicula. Nam nec commodo ligula, at ullamcorper odio. Donec accumsan et ipsum quis imperdiet. Donec enim tortor, eleifend nec ornare efficitur, aliquet nec nunc. Duis condimentum placerat eleifend.',
      },
      {
        id: '5',
        type: 'Text',
        text: 'Nam mauris est, pulvinar et erat a, tincidunt blandit augue. Nam congue consequat lacus, nec venenatis nisl tempor et. Nulla tempor, nulla eget scelerisque vulputate, libero urna porta ipsum, eu lacinia quam quam a diam. Aliquam nec lorem eget lorem faucibus cursus eu eu tellus. Fusce arcu dolor, pellentesque blandit orci vitae, elementum ullamcorper arcu. Ut sed metus nec elit posuere pellentesque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis eu mi tellus. Fusce est velit, consectetur non ipsum ut, dignissim facilisis felis. Duis congue metus vel risus aliquam efficitur. Duis lectus elit, ultrices quis neque placerat, congue eleifend ante. Duis mollis nec erat tempus accumsan. Nullam et congue ex, non dictum sem. Integer ut feugiat augue. In quis suscipit neque.,',
      },
      {
        id: '6',
        type: 'Text',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies gravida posuere. Nulla ullamcorper ipsum nisi, sed volutpat arcu fringilla eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis risus sit amet arcu mattis sagittis. Vestibulum gravida vel leo ac mollis. Ut ex felis, maximus in accumsan sit amet, pharetra id dolor. Nam sollicitudin nunc massa, et mollis libero rutrum ut. Curabitur ultrices, augue quis convallis laoreet, sapien mauris dignissim mauris, quis ullamcorper massa magna a felis. Morbi mollis ullamcorper tellus quis dignissim. Praesent tempor eros porta odio tempus, a pretium quam elementum. Donec varius mi lobortis elit cursus hendrerit.',
      },
      {
        id: '7',
        type: 'SectionTitle',
        title: 'Autre chose',
        text: null,
      },
      {
        id: '8',
        type: 'Text',
        text: 'Praesent sed felis quis lacus auctor dignissim. Sed vestibulum maximus metus ac porta. Vivamus vel laoreet leo. Sed vitae ligula vel metus luctus finibus. Donec elementum euismod nulla. Proin sodales sed urna sit amet tempor. Donec iaculis ligula justo, eu tincidunt ante iaculis quis. Fusce pretium purus dui. Morbi luctus diam ligula, eget vestibulum massa porta sed. Mauris eleifend odio euismod tortor vehicula, quis tempus lorem vulputate. Praesent dictum magna quis arcu aliquet, et pretium libero auctor. Etiam ut fringilla libero. Pellentesque sed odio porttitor, convallis est sit amet, tincidunt purus. Aenean placerat urna magna, nec bibendum arcu accumsan nec. Curabitur porttitor odio sit amet facilisis pellentesque. Sed commodo, velit eu porta consectetur, nisl metus sodales velit, in hendrerit tortor risus sed velit.',
      },
      {
        id: '9',
        type: 'Text',
        text: 'In et enim posuere, viverra justo ac, vestibulum ligula. Duis sollicitudin laoreet molestie. Duis interdum mauris dui, in pharetra dolor dignissim vitae. Cras facilisis facilisis ex. Suspendisse libero sapien, mollis a libero sit amet, placerat egestas tortor. Proin molestie est erat, non blandit enim volutpat a. Cras lacinia ante et ipsum vestibulum ultricies. Morbi pharetra iaculis congue. Quisque ut nisi orci. Pellentesque ullamcorper id ante nec vehicula. Nam nec commodo ligula, at ullamcorper odio. Donec accumsan et ipsum quis imperdiet. Donec enim tortor, eleifend nec ornare efficitur, aliquet nec nunc. Duis condimentum placerat eleifend.',
      },
      {
        id: '10',
        type: 'Text',
        text: 'Nam mauris est, pulvinar et erat a, tincidunt blandit augue. Nam congue consequat lacus, nec venenatis nisl tempor et. Nulla tempor, nulla eget scelerisque vulputate, libero urna porta ipsum, eu lacinia quam quam a diam. Aliquam nec lorem eget lorem faucibus cursus eu eu tellus. Fusce arcu dolor, pellentesque blandit orci vitae, elementum ullamcorper arcu. Ut sed metus nec elit posuere pellentesque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis eu mi tellus. Fusce est velit, consectetur non ipsum ut, dignissim facilisis felis. Duis congue metus vel risus aliquam efficitur. Duis lectus elit, ultrices quis neque placerat, congue eleifend ante. Duis mollis nec erat tempus accumsan. Nullam et congue ex, non dictum sem. Integer ut feugiat augue. In quis suscipit neque.,',
      },
    ] as ResourceContent[],
    isPublic: true,
    collections: [],
    viewsCount: 45,
    _count: {
      collections: 45,
      resourceFeedback: 0,
    },
    resourceFeedback: [],
    feedbackAverage: 0,
    feedbackCount: {
      notRecommended: 0,
      moderatelyRecommended: 0,
      recommended: 0,
      highlyRecommended: 0,
    },
    publicFeedback: true,
  }) satisfies Resource

export default {
  title: 'Ressource/Consultation d’une ressource',
  component: ResourceView,
} as Meta<typeof ResourceView>

type Story = StoryObj<typeof ResourceView>

const Template = (props: ComponentProps<typeof ResourceView>) => (
  <div className="fr-container fr-pt-4v">
    <ResourceView {...props} />
  </div>
)

// region Contributeur - Brouillon
export const Draft: Story = {
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Brouillon',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10994-46945',
      },
    ],
  },
  render: (args) => <Template {...args} />,
  args: {
    resource: {
      ...resource('paysage'),
      baseId: null,
      base: null,
      created: past,
      updated: past,
      published: null,
      lastPublished: null,
    },
    canWrite: true,
    canDelete: true,
  },
}
Draft.storyName = 'Contributeur - Brouillon'

export const DraftMobile = mobileStory({
  ...Draft,
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Contributeur - Brouillon (mobile)',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-49816',
      },
    ],
  },
})
DraftMobile.storyName = 'Contributeur - Brouillon (mobile)'
// endregion

// region Contributeur - Brouillon mis à jour
export const DraftUpdated: Story = {
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Contributeur - Brouillon mis à jour',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10994-47001',
      },
    ],
  },
  render: (args) => <Template {...args} />,
  args: {
    resource: {
      ...resource('paysage'),
      baseId: null,
      base: null,
      created: past,
      updated: present,
      published: null,
      lastPublished: null,
    },
    canWrite: true,
    canDelete: true,
  },
}
DraftUpdated.storyName = 'Contributeur - Brouillon mis à jour'

export const DraftUpdatedMobile = mobileStory({
  ...DraftUpdated,
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Contributeur - Brouillon mis à jour (mobile)',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-49817',
      },
    ],
  },
})
DraftUpdatedMobile.storyName = 'Contributeur - Brouillon mis à jour (mobile)'
// endregion

// region Contributeur - Publiée en Public
export const EditorPublishedPublic: Story = {
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Contributeur - Publiée en Public',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10994-47068',
      },
    ],
  },
  render: (args) => <Template {...args} />,
  args: {
    resource: { ...resource('portrait') },
    canWrite: true,
    canDelete: true,
  },
}
EditorPublishedPublic.storyName = 'Contributeur - Publiée en Public'

export const EditorPublishedPublicMobile = mobileStory({
  ...EditorPublishedPublic,
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Contributeur - Publiée en Public (mobile)',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-49823',
      },
    ],
  },
})
EditorPublishedPublicMobile.storyName =
  'Contributeur - Publiée en Public (mobile)'
// endregion

// region Contributeur - Publiée en Privé
export const EditorPublishedPrivate: Story = {
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Contributeur - Publiée en Privé',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10994-47686',
      },
    ],
  },
  render: (args) => <Template {...args} />,
  args: {
    resource: { ...resource('portrait'), isPublic: false },
    canWrite: true,
    canDelete: true,
  },
}
EditorPublishedPrivate.storyName = 'Contributeur - Publiée en Privé'

export const EditorPublishedPrivateMobile = mobileStory({
  ...EditorPublishedPrivate,
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Contributeur - Publiée en Privé (mobile)',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-49833',
      },
    ],
  },
})
EditorPublishedPrivateMobile.storyName =
  'Contributeur - Publiée en Privé (mobile)'
// endregion

// region Contributeur - Publiée en public avec des avis
export const EditorPublishedWithFeedback: Story = {
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Contributeur - Publiée en public avec des avis',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10994-47068',
      },
    ],
  },
  render: (args) => <Template {...args} />,
  args: {
    resource: {
      ...resource('portrait'),
      viewsCount: 45,
      _count: {
        collections: 45,
        resourceFeedback: 4,
      },
      feedbackAverage: 4,
    },
    canWrite: true,
    canDelete: true,
  },
}
EditorPublishedWithFeedback.storyName =
  'Contributeur - Publiée en public avec des avis'

export const EditorPublishedWithFeedbackMobile = mobileStory({
  ...EditorPublishedWithFeedback,
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Contributeur - Publiée en public avec des avis (mobile)',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-49823',
      },
    ],
  },
})
EditorPublishedWithFeedbackMobile.storyName =
  'Contributeur - Publiée en public avec des avis (mobile)'
// endregion

// region Contributeur - Publiée avec des modifications en attente
export const EditorPublishedPendingUpdate: Story = {
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Contributeur - Publiée avec des modifications en attente',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10994-47605',
      },
    ],
  },
  render: (args) => <Template {...args} />,
  args: {
    resource: {
      ...resource('portrait'),
      published: past,
      lastPublished: past,
      updated: present,
    },
    canWrite: true,
    canDelete: true,
  },
}
EditorPublishedPendingUpdate.storyName =
  'Contributeur - Publiée avec des modifications en attente'

export const EditorPublishedPendingUpdateMobile = mobileStory({
  ...EditorPublishedPendingUpdate,
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Contributeur - Publiée avec des modifications en attente (mobile)',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-49829',
      },
    ],
  },
})
EditorPublishedPendingUpdateMobile.storyName =
  'Contributeur - Publiée avec des modifications en attente (mobile)'
// endregion

// region Visiteur - Publiée en Public
export const VisitorPublishedPublic: Story = {
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Visiteur - Publiée en Public',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-48055',
      },
    ],
  },
  render: (args) => <Template {...args} />,
  args: {
    resource: { ...resource('portrait') },
    canWrite: false,
    canDelete: false,
  },
}
VisitorPublishedPublic.storyName = 'Visiteur - Publiée en Public'

export const VisitorPublishedPublicMobile = mobileStory({
  ...VisitorPublishedPublic,
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Visiteur - Publiée en Public (mobile)',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-49846',
      },
    ],
  },
})
VisitorPublishedPublicMobile.storyName = 'Visiteur - Publiée en Public (mobile)'
// endregion

// region Visiteur - Publiée en Privé
export const VisitorPublishedPrivate: Story = {
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Visiteur - Publiée en Privé',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-48065',
      },
    ],
  },
  render: (args) => <Template {...args} />,
  args: {
    resource: { ...resource('portrait'), isPublic: false },
    canWrite: false,
    canDelete: false,
  },
}
VisitorPublishedPrivate.storyName = 'Visiteur - Publiée en Privé'

export const VisitorPublishedPrivateMobile = mobileStory({
  ...VisitorPublishedPrivate,
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Visiteur - Publiée en Privé (mobile)',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-49853',
      },
    ],
  },
})
VisitorPublishedPrivateMobile.storyName = 'Visiteur - Publiée en Privé (mobile)'
// endregion

// region Visiteur - Sans image
export const SansImage: Story = {
  render: (args) => <Template {...args} />,
  args: {
    resource: resource(null),
  },
}
SansImage.storyName = 'Visiteur - Sans image'

export const SansImageMobile = mobileStory(SansImage)
SansImageMobile.storyName = 'Visiteur - Sans image (mobile)'
// endregion
