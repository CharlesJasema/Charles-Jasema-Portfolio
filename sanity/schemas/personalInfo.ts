import { defineType, defineField } from 'sanity'
import { enhancedImageField } from '../lib/assetConfig'

export default defineType({
  name: 'personalInfo',
  title: 'Personal Information',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'e.g., Software Engineer | Full-Stack Developer',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Multiple paragraphs for the about section',
      validation: Rule => Rule.required().min(1).max(10)
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio (One-liner)',
      type: 'text',
      rows: 2,
      description: 'Brief introduction for homepage and headers',
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, Country',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    }),
    defineField({
      name: 'professionalPhoto',
      title: 'Professional Photo',
      ...enhancedImageField,
      validation: Rule => Rule.required(),
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
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
          validation: Rule => Rule.uri({ scheme: ['http', 'https'] })
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          validation: Rule => Rule.uri({ scheme: ['http', 'https'] })
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
          validation: Rule => Rule.uri({ scheme: ['http', 'https'] })
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          validation: Rule => Rule.uri({ scheme: ['http', 'https'] })
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
          validation: Rule => Rule.uri({ scheme: ['http', 'https'] })
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          validation: Rule => Rule.uri({ scheme: ['http', 'https'] })
        }
      ]
    }),
    defineField({
      name: 'cvDownloadUrl',
      title: 'CV/Resume Download URL',
      type: 'string',
      description: 'Path to downloadable CV (e.g., /resume/Charles-Jasema-CV.pdf)'
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      description: 'Total years in the industry',
      validation: Rule => Rule.integer().min(0)
    }),
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available for Work', value: 'available' },
          { title: 'Open to Opportunities', value: 'open' },
          { title: 'Not Available', value: 'unavailable' }
        ]
      },
      initialValue: 'open'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'professionalPhoto'
    }
  }
})
