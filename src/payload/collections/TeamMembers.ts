// src/payload/collections/TeamMembers.ts
import { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'department'],
    group: 'Content',
  },
  timestamps: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Insurance', value: 'insurance' },
        { label: 'Accounting', value: 'accounting' },
        { label: 'Wealth Management', value: 'wealth-management' },
        { label: 'Healthcare Planning', value: 'healthcare-planning' },
        { label: 'Property', value: 'property' },
      ],
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
