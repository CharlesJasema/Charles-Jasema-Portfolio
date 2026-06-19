import { defineType, defineField } from 'sanity'
import { enhancedImageField } from '../lib/assetConfig'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'institution',
      title: 'Institution Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'degree',
      title: 'Degree/Program',
      type: 'string',
      description: 'e.g., Software Engineering Bootcamp, Graphics Design Certificate',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'field',
      title: 'Field of Study',
      type: 'string',
      description: 'e.g., Computer Science, Graphics Design'
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'string',
      description: 'Year or Month/Year (e.g., 2023, Jan 2023)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'string',
      description: 'Year or Month/Year, or "Present" if ongoing'
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'What you studied, key achievements, specializations'
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Honors, awards, notable accomplishments',
      options: {
        layout: 'list'
      }
    }),
    defineField({
      name: 'skills',
      title: 'Skills Acquired',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key skills or technologies learned',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'logo',
      title: 'Institution Logo (Optional)',
      ...enhancedImageField,
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        }
      ]
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (most recent first)',
      validation: Rule => Rule.integer().min(0),
      initialValue: 0
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show prominently on About page',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'institution',
      subtitle: 'degree',
      media: 'logo'
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media
      }
    }
  }
})
