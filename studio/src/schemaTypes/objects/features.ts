import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const features = defineType({
  name: 'features',
  title: 'Features',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'feature',
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
      name: 'image',
      title: 'Feature Icon',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
