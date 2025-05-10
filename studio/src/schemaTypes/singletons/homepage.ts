import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'hero_title',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero_description',
      title: 'Hero Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Hero Background',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    // dynamic array of schema types
    defineField({
      name: 'feature',
      title: 'Feature',
      type: 'array',
      of: [{type: 'feature'}],
    }),
  ],
})
