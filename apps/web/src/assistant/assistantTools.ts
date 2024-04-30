import { Function as MistralFunctionType } from '@mistralai/mistralai'

export const ragTool = {
  type: 'function',
  function: {
    name: 'recupereBasesRessourcesArticlesAides',
    description:
      'Récupère les bases, ressources et articles d’aides de la plateforme "Les bases du numérique d’intéret général"',
    parameters: {
      type: 'object',
      properties: {
        recherche: {
          type: 'string',
          description:
            'Meilleure résumé de la conversation et de la prompt utilisateur pour une recherche RAG efficace.',
        },
      },
      required: ['recherche'],
    },
  },
} satisfies { type: string; function: MistralFunctionType }

export const tools = [ragTool]
