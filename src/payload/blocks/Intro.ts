// src/payload/blocks/Intro.ts
import { Block } from 'payload'

export const IntroBlock: Block = {
  slug: 'intro',
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
}
