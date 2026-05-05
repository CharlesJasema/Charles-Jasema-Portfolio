import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'lyrics',
  title: 'Song Lyrics',
  type: 'document',
  fields: [
    defineField({
      name: 'songTitle',
      title: 'Song Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
      initialValue: 'Charles Jasema',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'album',
      title: 'Album',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'releaseYear',
      title: 'Release Year',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'English' },
          { title: 'Kakwa/Bari', value: 'Kakwa/Bari' },
          { title: 'Mixed', value: 'Mixed' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'verses',
      title: 'Verses',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'type',
            title: 'Section Type',
            type: 'string',
            options: {
              list: [
                'Intro',
                'Verse 1',
                'Verse 2',
                'Verse 3',
                'Verse 4',
                'Chorus',
                'Pre-Chorus',
                'Bridge',
                'Outro',
                'Interlude',
                'Instrumentals'
              ]
            }
          },
          {
            name: 'lines',
            title: 'Lines',
            type: 'array',
            of: [{ type: 'string' }]
          }
        ]
      }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3,
      description: 'Additional context about the song'
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url'
    }),
    defineField({
      name: 'mdundoUrl',
      title: 'Mdundo URL',
      type: 'url'
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
      title: 'songTitle',
      subtitle: 'album'
    }
  }
})