import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

// Custom structure for better organization
const structure = (S: any) =>
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
                .child(S.documentTypeList('song').title('Songs')),
              S.listItem()
                .title('Music Videos')
                .schemaType('musicVideo')
                .child(S.documentTypeList('musicVideo').title('Music Videos')),
              S.listItem()
                .title('Song Lyrics')
                .schemaType('lyrics')
                .child(S.documentTypeList('lyrics').title('Song Lyrics')),
            ])
        ),
      
      // Portfolio Section
      S.listItem()
        .title('💼 Portfolio')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Portfolio Projects')),
      
      // Blog Section
      S.listItem()
        .title('📝 Blog')
        .schemaType('blogPost')
        .child(S.documentTypeList('blogPost').title('Blog Posts')),
      
      // Divider
      S.divider(),
      
      // Quick Actions
      S.listItem()
        .title('⭐ Featured Content')
        .child(
          S.list()
            .title('Featured Content')
            .items([
              S.listItem()
                .title('Featured Songs')
                .child(
                  S.documentList()
                    .title('Featured Songs')
                    .filter('_type == "song" && featured == true')
                ),
              S.listItem()
                .title('Featured Projects')
                .child(
                  S.documentList()
                    .title('Featured Projects')
                    .filter('_type == "project" && featured == true')
                ),
              S.listItem()
                .title('Featured Blog Posts')
                .child(
                  S.documentList()
                    .title('Featured Blog Posts')
                    .filter('_type == "blogPost" && featured == true')
                ),
            ])
        ),
      
      S.listItem()
        .title('🆕 Recent Content')
        .child(
          S.list()
            .title('Recent Content')
            .items([
              S.listItem()
                .title('New Songs (2024-2025)')
                .child(
                  S.documentList()
                    .title('New Songs')
                    .filter('_type == "song" && isNew == true')
                ),
              S.listItem()
                .title('Recent Blog Posts')
                .child(
                  S.documentList()
                    .title('Recent Blog Posts')
                    .filter('_type == "blogPost"')
                    .params({ orderBy: [{ field: 'publishDate', direction: 'desc' }] })
                ),
            ])
        ),
    ])

export default defineConfig({
  name: 'charles-jasema-portfolio',
  title: 'Charles Jasema Portfolio CMS',
  subtitle: 'Professional Content Management System',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  basePath: '/admin',
  
  plugins: [
    structureTool({
      structure,
      name: 'content',
      title: 'Content',
    }),
    visionTool({
      name: 'vision',
      title: 'GROQ Query Tool',
    })
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Enhanced asset upload configuration
  form: {
    // Configure file upload settings
    file: {
      // Enable drag and drop for all file uploads
      directUploads: true,
    },
    // Configure image upload settings  
    image: {
      // Enable drag and drop for images
      directUploads: true,
    }
  },
  
  // Studio customization
  studio: {
    components: {
      // Custom components can be added here for enhanced upload UI
    }
  },
  
  // Document actions customization
  document: {
    actions: (prev) => {
      // Add custom actions for better workflow
      return prev
    }
  },
  
  // Tools configuration
  tools: (prev) => {
    return [
      ...prev,
      // Add custom tools if needed
    ]
  }
})