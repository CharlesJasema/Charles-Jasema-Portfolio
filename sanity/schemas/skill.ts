import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Software Engineering', value: 'software' },
          { title: 'Graphics Design', value: 'design' },
          { title: 'Music', value: 'music' },
          { title: 'Videography', value: 'videography' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory (Optional)',
      type: 'string',
      description: 'e.g., Frontend, Backend, UI/UX Design',
      options: {
        list: [
          // Software Engineering
          { title: 'Frontend Development', value: 'frontend' },
          { title: 'Backend Development', value: 'backend' },
          { title: 'Database', value: 'database' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Mobile Development', value: 'mobile' },
          // Design
          { title: 'UI/UX Design', value: 'ui-ux' },
          { title: 'Brand Design', value: 'brand' },
          { title: 'Print Design', value: 'print' },
          // Music
          { title: 'Performance', value: 'performance' },
          { title: 'Production', value: 'production' },
          { title: 'Songwriting', value: 'songwriting' },
          // Video
          { title: 'Video Editing', value: 'editing' },
          { title: 'Video Production', value: 'video-production' },
          { title: 'Motion Graphics', value: 'motion' }
        ]
      }
    }),
    defineField({
      name: 'proficiencyLevel',
      title: 'Proficiency Level',
      type: 'string',
      options: {
        list: [
          { title: 'Expert', value: 'expert' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Beginner', value: 'beginner' }
        ]
      },
      initialValue: 'intermediate'
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      description: 'How many years you\'ve been using this skill',
      validation: Rule => Rule.min(0).max(50)
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      rows: 2,
      description: 'Brief description of your experience with this skill'
    }),
    defineField({
      name: 'relatedTools',
      title: 'Related Tools/Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Specific tools or technologies within this skill',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (Optional)',
      type: 'string',
      description: 'React Icons name (e.g., FaReact, FaCode, FaPalette)'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: Rule => Rule.integer().min(0),
      initialValue: 0
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show prominently on homepage/about',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      proficiency: 'proficiencyLevel'
    },
    prepare({ title, subtitle, proficiency }) {
      return {
        title,
        subtitle: `${subtitle} - ${proficiency || 'Intermediate'}`
      }
    }
  }
})
