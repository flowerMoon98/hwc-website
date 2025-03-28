// src/payload/blocks/OurNiche.ts
import { Block } from 'payload'

export const OurNicheBlock: Block = {
  slug: 'ourNiche',
  labels: {
    singular: 'Our Niche Block',
    plural: 'Our Niche Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'stickyContent',
      type: 'richText',
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 3,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
