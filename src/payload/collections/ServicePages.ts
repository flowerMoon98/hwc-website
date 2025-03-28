// src/payload/collections/ServicePages.ts
import { CollectionConfig } from 'payload'
import { HeroBlock } from '@/payload/blocks/Hero'
import { IntroBlock } from '@/payload/blocks/Intro'
import { ContentBlock } from '@/payload/blocks/Content'
import { ContactForm } from '@/payload/blocks/ContactForm'

export const ServicePages: CollectionConfig = {
  slug: 'service-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'serviceType',
      type: 'select',
      options: [
        { label: 'Insurance', value: 'insurance' },
        { label: 'Accounting', value: 'accounting' },
        { label: 'Wealth Management', value: 'wealth-management' },
        { label: 'Healthcare Planning', value: 'healthcare-planning' },
        { label: 'Property', value: 'property' },
      ],
      required: true,
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
