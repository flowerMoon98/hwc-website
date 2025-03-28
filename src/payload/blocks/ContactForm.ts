// src/payload/blocks/ContactForm/index.ts
import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',
  imageAltText: 'Contact Form ',
  interfaceName: 'ContactForm',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'fields',
      type: 'array',
      label: 'Form Fields',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Field Name',
          admin: {
            description: 'This will be used as the field identifier, e.g., "email", "name", etc.',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Field Label',
          admin: {
            description:
              'This will be displayed to the user, e.g., "Email Address", "Full Name", etc.',
          },
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          label: 'Field Type',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select', value: 'select' },
            { label: 'Checkbox', value: 'checkbox' },
            { label: 'Radio', value: 'radio' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Required Field',
          defaultValue: false,
        },
        {
          name: 'options',
          type: 'array',
          label: 'Options',
          admin: {
            condition: (data, siblingData) => {
              return siblingData?.type === 'select' || siblingData?.type === 'radio'
            },
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Option Label',
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Option Value',
            },
          ],
        },
      ],
    },
    {
      name: 'submitLabel',
      type: 'text',
      label: 'Submit Button Label',
      defaultValue: 'Submit',
      required: true,
    },
    {
      name: 'successMessage',
      type: 'richText',
      label: 'Success Message',
      admin: {
        description: 'Message to display after successful form submission',
      },
    },
  ],
}
