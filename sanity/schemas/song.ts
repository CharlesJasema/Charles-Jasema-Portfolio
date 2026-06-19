import { defineType, defineField } from 'sanity'
import { enhancedImageField, enhancedAudioField, FILE_SIZE_LIMITS } from '../lib/assetConfig'
import { DurationInput } from '../components/DurationInput'

export default defineType({
  name: 'song',
  title: 'Song',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Song Title',
      type: 'string',
      validation: Rule => Rule.required().min(1).max(100)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().min(10).max(500)
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Format: MM:SS (e.g., 4:30)',
      components: {
        input: DurationInput,
      },
      validation: Rule => Rule.required().regex(/^\d{1,2}:\d{2}$/, {
        name: 'duration',
        invert: false
      })
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'album',
      title: 'Album',
      type: 'string',
      options: {
        list: [
          { title: 'Singles', value: 'Singles' },
          { title: 'Collaborations', value: 'Collaborations' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mdundoUrl',
      title: 'Mdundo URL',
      type: 'url',
      description: 'Link to song on Mdundo platform',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL (Optional)',
      type: 'url',
      description: 'Link to song on Spotify',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'appleMusicUrl',
      title: 'Apple Music URL (Optional)',
      type: 'url',
      description: 'Link to song on Apple Music',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'audioFile',
      title: '🎵 Upload Audio File (Optional)',
      ...enhancedAudioField,
      description: `Upload MP3 or WAV file for preview (max ${Math.round(FILE_SIZE_LIMITS.audio / (1024 * 1024))}MB). Keep using Mdundo/Spotify for full streaming.`
    }),
    defineField({
      name: 'songStory',
      title: '📖 Song Story/Inspiration',
      type: 'text',
      rows: 5,
      description: 'Share the story behind this song - what inspired it, when you wrote it, etc.',
      placeholder: 'This song was inspired by...'
    }),
    defineField({
      name: 'recordingDetails',
      title: '🎙️ Recording Details',
      type: 'text',
      rows: 3,
      description: 'Where and when was this recorded? Any special details?',
      placeholder: 'Recorded at...'
    }),
    defineField({
      name: 'collaborators',
      title: '👥 Collaborators',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List any collaborators (producers, featured artists, etc.)'
    }),
    defineField({
      name: 'albumArt',
      title: 'Album Art',
      ...enhancedImageField,
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility'
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display this song prominently',
      initialValue: false
    }),
    defineField({
      name: 'isNew',
      title: 'New Release',
      type: 'boolean',
      description: 'Mark as new release (2024-2025)',
      initialValue: false
    }),
    defineField({
      name: 'isCollaboration',
      title: 'Collaboration',
      type: 'boolean',
      description: 'Is this a collaboration with other artists?',
      initialValue: false
    }),
    defineField({
      name: 'isFirstSong',
      title: 'First Song',
      type: 'boolean',
      description: 'Mark as the first song ever released',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'album',
      media: 'albumArt'
    }
  }
})