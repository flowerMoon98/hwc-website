// src/payload/collections/AboutUs.ts
import { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/Hero'
import { ContentBlock } from '../blocks/Content'

export const AboutUs: CollectionConfig = {
  slug: 'about-us',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  timestamps: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'hero',
      type: 'blocks',
      blocks: [HeroBlock],
      maxRows: 1,
      required: true,
    },
    {
      name: 'leftPanel',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
      ],
    },
    {
      name: 'teamSection',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'subheading',
          type: 'text',
        },
        {
          name: 'teamMembers',
          type: 'relationship',
          relationTo: 'team-members',
          hasMany: true,
        },
      ],
    },
    {
      name: 'additionalContent',
      type: 'blocks',
      blocks: [ContentBlock],
    },
    {
      name: 'meta',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
