import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

// Enhanced structure with badges and counts
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
        .schemaType('project')
        .child(
          S.documentTypeList('project')
            .title('Portfolio Projects')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
            .filter('_type == "project"')
        ),
      
      // Blog Section
      S.listItem()
        .title('📝 Blog')
        .schemaType('blogPost')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog Posts')
            .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
            .filter('_type == "blogPost"')
        ),
      
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
                .icon(() => '⭐')
                .child(
                  S.documentList()
                    .title('Featured Songs')
                    .filter('_type == "song" && featured == true')
                    .defaultOrdering([{ field: 'releaseDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('Featured Projects')
                .icon(() => '⭐')
                .child(
                  S.documentList()
                    .title('Featured Projects')
                    .filter('_type == "project" && featured == true')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
              S.listItem()
                .title('Featured Blog Posts')
                .icon(() => '⭐')
                .child(
                  S.documentList()
                    .title('Featured Blog Posts')
                    .filter('_type == "blogPost" && featured == true')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
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
                .icon(() => '🆕')
                .child(
                  S.documentList()
                    .title('New Songs')
                    .filter('_type == "song" && isNew == true')
                    .defaultOrdering([{ field: 'releaseDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('Recent Blog Posts')
                .icon(() => '🆕')
                .child(
                  S.documentList()
                    .title('Recent Blog Posts')
                    .filter('_type == "blogPost"')
                    .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
                ),
              S.listItem()
                .title('Recent Projects')
                .icon(() => '🆕')
                .child(
                  S.documentList()
                    .title('Recent Projects')
                    .filter('_type == "project"')
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
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
  
  // Enhanced search configuration - REMOVED DUE TO TYPE ERRORS
  // search: See sanity documentation for proper configuration
  
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
      // Custom layout can be added here if needed
    },
  },
  
  // Document actions customization for better workflow
  document: {
    actions: (prev, context) => {
      // Add custom actions based on document type
      const { schemaType } = context
      
      // For all content types, customize the action order
      const actions = prev
      
      // You can add custom actions here
      // Example: Duplicate action, Custom publish workflow, etc.
      
      return actions
    },
    
    // Add badges to show document status
    badges: (prev, context) => {
      return [
        ...prev,
        // Add custom badge for featured content
        (props) => {
          if (props.published?.featured) {
            return {
              label: 'Featured',
              title: 'This content is featured',
              color: 'primary',
            }
          }
          return null
        },
        // Add badge for new content
        (props) => {
          if (props.published?.isNew) {
            return {
              label: 'New',
              title: 'Marked as new release',
              color: 'success',
            }
          }
          return null
        },
        // Add badge for drafts older than 7 days
        (props) => {
          if (props.draft && !props.published) {
            const draftDate = new Date(props.draft._updatedAt)
            const daysSinceDraft = Math.floor(
              (Date.now() - draftDate.getTime()) / (1000 * 60 * 60 * 24)
            )
            if (daysSinceDraft > 7) {
              return {
                label: `Draft (${daysSinceDraft}d old)`,
                title: 'This draft has been sitting for a while',
                color: 'warning',
              }
            }
          }
          return null
        },
      ].filter(Boolean)
    },
  },
  
  // Tools configuration
  tools: (prev) => {
    return [
      ...prev,
      // Add custom tools if needed
    ]
  }
})