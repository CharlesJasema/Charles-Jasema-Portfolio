import { defineType, defineField } from 'sanity'
import { enhancedImageField } from '../lib/assetConfig'

export default defineType({
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'position',
      title: 'Job Title/Position',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'company',
      title: 'Company/Organization',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Freelance', value: 'freelance' },
          { title: 'Volunteer', value: 'volunteer' },
          { title: 'Ministry', value: 'ministry' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'string',
      description: 'Month Year (e.g., Jan 2020, 2020)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'string',
      description: 'Month Year or "Present" if current position'
    }),
    defineField({
      name: 'isCurrent',
      title: 'Current Position',
      type: 'boolean',
      description: 'Check if this is your current role',
      initialValue: false
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country or "Remote"'
    }),
    defineField({
      name: 'description',
      title: 'Role Description',
      type: 'text',
      rows: 4,
      description: 'Brief overview of your role and impact',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'responsibilities',
      title: 'Key Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Main duties and tasks',
      options: {
        layout: 'list'
      }
    }),
    defineField({
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Notable accomplishments and impact',
      options: {
        layout: 'list'
      }
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies/Tools Used',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tech stack, tools, or instruments (for music)',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo (Optional)',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Software Engineering', value: 'software' },
          { title: 'Design', value: 'design' },
          { title: 'IT Support', value: 'it-support' },
          { title: 'Music Ministry', value: 'music-ministry' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
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
      title: 'position',
      subtitle: 'company',
      media: 'companyLogo',
      isCurrent: 'isCurrent'
    },
    prepare({ title, subtitle, media, isCurrent }) {
      return {
        title,
        subtitle: `${subtitle}${isCurrent ? ' (Current)' : ''}`,
        media
      }
    }
  }
})
