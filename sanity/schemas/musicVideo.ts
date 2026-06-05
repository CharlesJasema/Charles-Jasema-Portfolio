import { defineType, defineField } from 'sanity'
import { enhancedImageField, enhancedVideoField, FILE_SIZE_LIMITS } from '../lib/assetConfig'

export default defineType({
  name: 'musicVideo',
  title: 'Music Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Extract from YouTube URL (e.g., 5LJ2kqwd5jM)'
    }),
    defineField({
      name: 'videoFile',
      title: '🎬 Upload Video File (Optional)',
      ...enhancedVideoField,
      description: `Upload MP4 file for preview (max ${Math.round(FILE_SIZE_LIMITS.video / (1024 * 1024))}MB). Keep using YouTube for full videos and better reach.`
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Year',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'views',
      title: 'View Count',
      type: 'string',
      description: 'e.g., 1.2K+',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Music Video', value: 'Music Video' },
          { title: 'Lyrical Video', value: 'Lyrical Video' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      ...enhancedImageField
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnail'
    }
  }
})