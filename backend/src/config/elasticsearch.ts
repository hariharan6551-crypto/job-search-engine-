export const elasticsearchConfig = {
  node: process.env.ELASTICSEARCH_HOST || 'http://localhost:9200',
  auth: process.env.ELASTICSEARCH_USER
    ? {
        username: process.env.ELASTICSEARCH_USER,
        password: process.env.ELASTICSEARCH_PASSWORD || '',
      }
    : undefined,
  maxRetries: 3,
  requestTimeout: 30000,
  indices: {
    jobs: process.env.ELASTICSEARCH_INDEX_JOBS || 'jobs',
    users: 'users',
  },
};

export const jobMapping = {
  settings: {
    analysis: {
      analyzer: {
        semantic_english: {
          type: 'custom',
          tokenizer: 'standard',
          filter: ['lowercase', 'english_stop', 'english_stemmer', 'synonym_graph'],
        },
      },
      filter: {
        english_stop: { type: 'stop', stopwords: '_english_' },
        english_stemmer: { type: 'stemmer', language: 'english' },
        synonym_graph: { 
          type: 'synonym_graph', 
          synonyms: [
            'fresher, junior, entry level => 0_years',
            'developer, engineer, programmer, coder',
            'remote, wfh, work from home',
            'ml, machine learning, ai, artificial intelligence'
          ] 
        },
      },
    },
  },
  mappings: {
    properties: {
      title: { type: 'text', analyzer: 'semantic_english', fields: { keyword: { type: 'keyword' } } },
      company: { type: 'text', fields: { keyword: { type: 'keyword' } } },
      description: { type: 'text', analyzer: 'semantic_english' },
      vector_embedding: { type: 'dense_vector', dims: 384, index: true, similarity: 'cosine' },
      location: { type: 'keyword' },
      skills: { type: 'keyword' },
      salary_min: { type: 'float' },
      salary_max: { type: 'float' },
      type: { type: 'keyword' },
      posted_at: { type: 'date' },
      geo_location: { type: 'geo_point' },
      is_active: { type: 'boolean' },
    },
  },
};
