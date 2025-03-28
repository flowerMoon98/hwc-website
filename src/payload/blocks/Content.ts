// src/payload/blocks/Content.ts
import { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  fields: [
    {
      name: 'columns',
      type: 'select',
      options: [
        { label: 'One Column', value: 'one' },
        { label: 'Two Columns', value: 'two' },
      ],
      defaultValue: 'one',
      required: true,
    },
    {
      name: 'columnOne',
      type: 'richText',
      required: true,
    },
    {
      name: 'columnTwo',
      type: 'richText',
      admin: {
        condition: (data, siblingData) => siblingData?.columns === 'two',
      },
    },
  ],
}
