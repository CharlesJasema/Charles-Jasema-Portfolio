import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Software Development', value: 'software' },
          { title: 'Design', value: 'design' },
          { title: 'Videography', value: 'videography' },
          { title: 'Music', value: 'music' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().min(50).max(300)
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative text'
          }
        ]
      }],
      validation: Rule => Rule.required().min(1).max(10)
    }),
    defineField({
      name: 'tags',
      title: 'Technologies/Skills',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.required().min(1).max(10)
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub Repository',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: Rule => Rule.integer().min(0)
    }),
    defineField({
      name: 'challenges',
      title: '🎯 Project Challenges',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What challenges did you face during this project?',
      options: {
        layout: 'list'
      }
    }),
    defineField({
      name: 'solutions',
      title: '💡 Solutions Implemented',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'How did you solve the challenges?',
      options: {
        layout: 'list'
      }
    }),
    defineField({
      name: 'detailedTechStack',
      title: '🛠️ Detailed Tech Stack',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                { title: 'Frontend', value: 'frontend' },
                { title: 'Backend', value: 'backend' },
                { title: 'Database', value: 'database' },
                { title: 'DevOps', value: 'devops' },
                { title: 'Design', value: 'design' },
                { title: 'Other', value: 'other' }
              ]
            }
          },
          {
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'string' }]
          }
        ]
      }],
      description: 'Organize technologies by category'
    }),
    defineField({
      name: 'duration',
      title: '⏱️ Project Duration',
      type: 'string',
      description: 'e.g., "2 weeks", "3 months", "6 months"',
      placeholder: '2 weeks'
    }),
    defineField({
      name: 'teamSize',
      title: '👥 Team Size',
      type: 'number',
      description: 'How many people worked on this project?',
      validation: Rule => Rule.integer().min(1).max(50),
      initialValue: 1
    }),
    defineField({
      name: 'myRole',
      title: '🎭 My Role',
      type: 'string',
      description: 'What was your role in this project?',
      placeholder: 'Full-Stack Developer, UI/UX Designer, etc.'
    }),
    defineField({
      name: 'testimonial',
      title: '💬 Client Testimonial (Optional)',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Testimonial Text',
          type: 'text',
          rows: 3
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'string'
        },
        {
          name: 'role',
          title: 'Author Role/Title',
          type: 'string'
        },
        {
          name: 'company',
          title: 'Company (Optional)',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'keyFeatures',
      title: '✨ Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Main features or highlights of this project',
      options: {
        layout: 'list'
      }
    }),
    defineField({
      name: 'lessonsLearned',
      title: '📚 Lessons Learned',
      type: 'text',
      rows: 3,
      description: 'What did you learn from this project?'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'images.0'
    }
  }
})