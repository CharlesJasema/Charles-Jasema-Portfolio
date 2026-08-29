const { defineConfig } = require('sanity')
const { structureTool } = require('sanity/structure') 
const { visionTool } = require('@sanity/vision')

// Enhanced structure with badges and counts
const structure = (S) =>
  S.list()
    .title('Content Management')
    .items([
      // Music Section
      S.listItem()
        .title('🎵 Music Content')
        .child(
          S.list()
            .title('Music Management')
            .items([
              S.listItem()
                .title('Songs')
                .schemaType('song')
                .child(
                  S.documentTypeList('song')
                    .title('Songs')
                    .defaultOrdering([{ field: 'releaseDate', direction: 'desc' }])
                    .filter('_type == "song"')
                ),
              S.listItem()
                .title('Music Videos')
                .schemaType('musicVideo')
                .child(
                  S.documentTypeList('musicVideo')
                    .title('Music Videos')
                    .defaultOrdering([{ field: 'releaseDate', direction: 'desc' }])
                    .filter('_type == "musicVideo"')
                ),
              S.listItem()
                .title('Song Lyrics')
                .schemaType('lyrics')
                .child(
                  S.documentTypeList('lyrics')
                    .title('Song Lyrics')
                    .defaultOrdering([{ field: 'releaseYear', direction: 'desc' }])
                    .filter('_type == "lyrics"')
                ),
            ])
        ),
      
      // Portfolio Section
      S.listItem()
        .title('💼 Portfolio')
        .child(
          S.list()
            .title('Portfolio Management')
            .items([
              S.listItem()
                .title('Projects')
                .schemaType('project')
                .child(
                  S.documentTypeList('project')
                    .title('Projects')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                    .filter('_type == "project"')
                ),
              S.listItem()
                .title('Skills')
                .schemaType('skill')
                .child(
                  S.documentTypeList('skill')
                    .title('Skills')
                    .defaultOrdering([{ field: 'category', direction: 'asc' }])
                    .filter('_type == "skill"')
                ),
            ])
        ),
      
      // Blog Section
      S.listItem()
        .title('📝 Blog')
        .child(
          S.list()
            .title('Blog Management')
            .items([
              S.listItem()
                .title('Blog Posts')
                .schemaType('post')
                .child(
                  S.documentTypeList('post')
                    .title('Blog Posts')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                    .filter('_type == "post"')
                ),
              S.listItem()
                .title('Categories')
                .schemaType('category')
                .child(
                  S.documentTypeList('category')
                    .title('Categories')
                    .filter('_type == "category"')
                ),
            ])
        ),
      
      // Content Section
      S.listItem()
        .title('📄 Content Pages')
        .child(
          S.list()
            .title('Page Management')
            .items([
              S.listItem()
                .title('About Page')
                .schemaType('aboutPage')
                .child(
                  S.documentTypeList('aboutPage')
                    .title('About Page')
                    .filter('_type == "aboutPage"')
                ),
              S.listItem()
                .title('Home Page')
                .schemaType('homePage')
                .child(
                  S.documentTypeList('homePage')
                    .title('Home Page')
                    .filter('_type == "homePage"')
                ),
            ])
        ),
      
      // Settings
      S.listItem()
        .title('⚙️ Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('Site Configuration')
                .schemaType('siteConfig')
                .child(
                  S.documentTypeList('siteConfig')
                    .title('Site Configuration')
                    .filter('_type == "siteConfig"')
                ),
            ])
        ),
    ])

module.exports = defineConfig({
  name: 'charles-jasema-portfolio',
  title: 'Charles Jasema Portfolio',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  basePath: '/admin',
  
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: [], // Will be populated when schemas are converted
  },
  
  // Studio configuration
  studio: {
    components: {},
  },
  
  // Document actions
  document: {
    actions: (prev, context) => prev,
  },
});