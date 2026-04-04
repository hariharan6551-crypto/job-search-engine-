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
  mappings: {
    properties: {
      title: { type: 'text', analyzer: 'standard' },
      company: { type: 'text' },
      description: { type: 'text', analyzer: 'standard' },
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
