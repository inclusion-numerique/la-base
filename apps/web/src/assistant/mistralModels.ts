export const mistralModels = {
  Mistral7B: {
    name: 'open-mistral-7b',
    description:
      'The first dense model released by Mistral AI, perfect for experimentation, customization, and quick iteration. At the time of the release, it matched the capabilities of models up to 30B parameters.',
    tokenLimit: 32_000,
  },
  Mixtral8x7B: {
    name: 'open-mixtral-8x7b',
    description:
      'A sparse mixture of experts model. As such, it leverages up to 45B parameters but only uses about 12B during inference, leading to better inference throughput at the cost of more vRAM.',
    tokenLimit: 32_000,
  },
  Mixtral8x22B: {
    name: 'open-mixtral-8x22b',
    description:
      'A bigger sparse mixture of experts model. As such, it leverages up to 141B parameters but only uses about 39B during inference, leading to better inference throughput at the cost of more vRAM.',
    tokenLimit: 64_000,
  },
  MistralSmall: {
    name: 'mistral-small-latest',
    description:
      'Suitable for simple tasks that one can do in bulk (Classification, Customer Support, or Text Generation)',
    tokenLimit: 32_000,
  },
  MistralMedium: {
    name: 'mistral-medium-latest',
    description:
      'Ideal for intermediate tasks that require moderate reasoning (Data extraction, Summarizing a Document, Writing emails, Writing a Job Description, or Writing Product Descriptions)',
    tokenLimit: 32_000,
    deprecationNotice: 'This model will be deprecated in the coming months.',
  },
  MistralLarge: {
    name: 'mistral-large-latest',
    description:
      "Our flagship model that's ideal for complex tasks that require large reasoning capabilities or are highly specialized (Synthetic Text Generation, Code Generation, RAG, or Agents).",
    tokenLimit: 32_000,
  },
  MistralEmbeddings: {
    name: 'mistral-embed',
    description:
      'A model that converts text into numerical vectors of embeddings in 1024 dimensions. Achieves a retrieval score of 55.26 on MTEB.',
    tokenLimit: 8000,
  },
}
