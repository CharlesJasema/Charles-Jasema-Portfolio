// Sanity Client - JavaScript Version
// Note: Sanity dependencies removed for initial build compatibility

// Mock client for build compatibility
const createMockClient = () => ({
  fetch: async () => [],
  config: () => ({
    dataset: 'production',
    projectId: 'mock-project-id',
    apiHost: 'https://api.sanity.io',
  }),
});

const mockClient = createMockClient();

const client = mockClient;
const previewClient = mockClient;

module.exports = {
  client,
  previewClient,
};

// Default export for compatibility
module.exports.default = client;