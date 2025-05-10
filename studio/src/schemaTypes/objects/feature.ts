import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const feature = defineType({
  name: 'feature',
  title: 'Features',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'feature_title',
      title: 'Feature Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'feature_description',
      title: 'Feature Description',
      type: 'string',
    }),
    defineField({
      name: 'feature_icon',
      title: 'Feature Icon',
      type: 'icon',
      // validation: (Rule) => Rule.required(),
    }),
  ],
});
