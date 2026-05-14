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
      name: 'rawLyricsText',
      title: '📝 Easy Upload: Paste Full Lyrics Here',
      type: 'text',
      rows: 20,
      description: `Paste your complete lyrics here! Format example:

Verse 1
Jesus You are Lord
You are the King of Kings

Chorus
We worship You
We praise Your name

Verse 2
Your love endures forever
Your grace is sufficient

The system will automatically organize them into sections.`,
      placeholder: 'Paste your full lyrics here...'
    }),
    defineField({
      name: 'lyricsDocument',
      title: '📄 Or Upload Document',
      type: 'file',
      description: 'Upload a PDF, Word, or TXT file with your lyrics',
      options: {
        accept: '.pdf,.docx,.doc,.txt'
      }
    }),
    defineField({
      name: 'verses',
      title: 'Structured Lyrics (Auto-generated or Manual)',
      type: 'array',
      description: 'This will be auto-filled from the text above, or you can add manually',
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
      }]
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