// src/payload/collections/Pages.ts
import { CollectionConfig } from 'payload'
import { HeroBlock } from '@/payload/blocks/Hero'
import { IntroBlock } from '@/payload/blocks/Intro'
import { ContentBlock } from '@/payload/blocks/Content'
import { ContactForm } from '@/payload/blocks/ContactForm'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content',
  },
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
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, IntroBlock, ContentBlock, ContactForm],
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
