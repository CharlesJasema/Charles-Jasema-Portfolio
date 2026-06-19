import { createClient } from 'next-sanity'

// Fallback configuration for build-time when env vars are not set
const fallbackConfig = {
  projectId: 'dummy-project-id',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published' as const,
}

// Check if we're in a production build without proper Sanity configuration
const isProduction = process.env.NODE_ENV === 'production'
const hasValidSanityConfig = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== '' && 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'dummy-project-id'

// Create a mock client that returns empty arrays/null for build time
const createMockClient = () => ({
  fetch: async () => [],
  config: () => ({
    dataset: 'production',
    projectId: 'dummy-project-id',
    apiHost: 'https://api.sanity.io',
  }),
})

const mockClient = createMockClient()

export const client = hasValidSanityConfig ? createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || fallbackConfig.dataset,
  apiVersion: fallbackConfig.apiVersion,
  useCdn: fallbackConfig.useCdn,
  perspective: fallbackConfig.perspective,
}) : mockClient

// For preview mode (draft content)
export const previewClient = hasValidSanityConfig ? createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || fallbackConfig.dataset,
  apiVersion: fallbackConfig.apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts' as const,
}) : mockClient