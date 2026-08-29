// Sanity Queries - JavaScript Version
// Note: Sanity dependencies removed for initial build compatibility

// Mock functions for build compatibility
const mockQuery = async () => {
  console.log('Mock Sanity query - returning empty data for build compatibility')
  return []
};

const mockSingleQuery = async () => {
  console.log('Mock Sanity single query - returning null for build compatibility')
  return null
};

// API functions
async function getSongs() {
  return mockQuery()
}

async function getFeaturedSongs() {
  return mockQuery()
}

async function getMusicVideos() {
  return mockQuery()
}

async function getProjects() {
  return mockQuery()
}

async function getBlogPosts() {
  return mockQuery()
}

async function getPostBySlug(slug) {
  return mockSingleQuery()
}

async function getPersonalInfo() {
  return mockSingleQuery()
}

async function getFeaturedContent() {
  return {
    songs: [],
    projects: [],
    blogPosts: []
  }
}

async function getFeaturedSkills() {
  return []
}

module.exports = {
  getSongs,
  getFeaturedSongs,
  getMusicVideos,
  getProjects,
  getBlogPosts,
  getPostBySlug,
  getPersonalInfo,
  getFeaturedContent,
  getFeaturedSkills,
};