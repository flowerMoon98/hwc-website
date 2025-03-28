# Payload CMS v3 Best Practices for HWC Website

This document outlines the key best practices and standards for implementing Payload CMS v3 in the HWC Website project, focusing on our hybrid architecture that combines Payload CMS with Next.js.

## Table of Contents

1. [TypeScript Integration](#typescript-integration)
2. [Collection & Global Configuration](#collection--global-configuration)
3. [Block-Based Content Structure](#block-based-content-structure)
4. [Next.js Integration](#nextjs-integration)
5. [Access Control & Security](#access-control--security)
6. [Rich Text & Media Handling](#rich-text--media-handling)
7. [Admin UI Customization](#admin-ui-customization)
8. [Performance Optimization](#performance-optimization)

---

## TypeScript Integration

### Use Generated Types

The most important TypeScript practice in Payload v3 is to rely on auto-generated types:

```bash
# Generate types whenever you change your Payload configuration
pnpm payload generate:types
```

- **Always use the generated `payload-types.ts` file** as your source of truth
- Import types from this file rather than manually defining interfaces
- Example: `import type { ServicePage } from '@/payload-types'`

### Type Function Parameters Explicitly

When TypeScript complains about parameters implicitly having an `any` type (common in validate functions, hooks, or access control), provide explicit type annotations:

```typescript
// ❌ Bad
validate: (value) => { /* ... */ }

// ✅ Good
validate: (value: string | undefined) => { /* ... */ }
```

### Use Payload's Configuration Types

Leverage Payload's configuration object types:

```typescript
import type { 
  CollectionConfig,
  GlobalConfig,
  Block,
  Field
} from 'payload'
```

## Collection & Global Configuration

### Collection Structure

Follow these patterns for collection definitions:

```typescript
import type { CollectionConfig } from 'payload'

export const ServicePages: CollectionConfig = {
  slug: 'service-pages',
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
    // Additional fields...
  ],
}
```

### Block-Based Fields

For modular content, use the `blocks` field type with a clear structure:

```typescript
{
  name: 'layout',
  type: 'blocks',
  blocks: [
    HeroBlock,
    IntroBlock,
    ContentBlock,
    ContactFormBlock,
    // Other blocks...
  ],
}
```

### Global Configuration

For site-wide content like headers and footers:

```typescript
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    // Navigation fields, logo, etc.
  ],
}
```

## Block-Based Content Structure

### Block Definition

Define blocks with clear types and structure:

```typescript
import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero Blocks',
  },
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
  ],
}
```

### Block Rendering Component

Create corresponding React components for each block:

```tsx
// src/app/(frontend)/components/blocks/Hero.tsx
import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

type HeroProps = {
  heading: string
  subheading?: string | null
  image: string | Media
  ctaButton?: {
    label?: string | null
    link?: string | null
  }
}

const Hero: React.FC<HeroProps> = ({ 
  heading, 
  subheading, 
  image, 
  ctaButton 
}) => {
  // Component implementation
}

export default Hero
```

### Block Registry

Implement a central registry for mapping block types to components:

```tsx
// src/app/(frontend)/components/blocks/RenderBlock.tsx
import React from 'react'
import { Page } from '@/payload-types'

// Import block components
import Hero from './Hero'
import Intro from './Intro'
import Content from './Content'
// Import other block components...

// Type for blocks from payload-types.ts
type BlockType = Extract<Page['layout'][number], { blockType: string }>

// Map block types to their respective components
const blockComponents: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  intro: Intro,
  content: Content,
  // Map other blocks...
}

export type RenderBlockProps = {
  blocks: BlockType[] | null | undefined
  className?: string
}

export const RenderBlock: React.FC<RenderBlockProps> = ({ blocks, className }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null
  }

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const BlockComponent = blockComponents[block.blockType]

        if (!BlockComponent) {
          console.warn(`Block of type '${block.blockType}' is not supported.`)
          return null
        }

        return (
          <BlockComponent 
            key={`block-${block.blockType}-${index}`} 
            {...block} 
          />
        )
      })}
    </div>
  )
}
```

## Next.js Integration

### Payload Client

Create a cached Payload client for data fetching:

```typescript
// src/payload/getPayloadClient.ts
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

// Create a cached version of the Payload client to improve performance
export const getPayloadClient = cache(async () => {
  const payload = await getPayload({
    config: configPromise,
  })
  
  return payload
})
```

### Data Fetching in Pages

Use React's `cache()` function for efficient data fetching:

```tsx
// src/app/(frontend)/services/[slug]/page.tsx
import { cache } from 'react'
import { getPayloadClient } from '@/payload/getPayloadClient'
import type { ServicePage } from '@/payload-types'

// Cache the getServicePage function to improve performance
const getServicePage = cache(async (slug: string): Promise<ServicePage | null> => {
  const payload = await getPayloadClient()
  
  const { docs } = await payload.find({
    collection: 'service-pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2, // Adjust depth as needed for nested relationships
  })
  
  if (!docs || docs.length === 0) {
    return null
  }
  
  return docs[0] as ServicePage
})

// Use the function in your page component
export default async function ServicePage({ params }: { params: { slug: string } }) {
  const page = await getServicePage(params.slug)
  
  // Component implementation...
}
```

### Metadata Generation

Implement dynamic metadata for SEO:

```tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getServicePage(params.slug)
  
  if (!page) {
    return {
      title: 'Service Not Found',
    }
  }
  
  return {
    title: `${page.title} | HWC Services`,
    description: page.meta?.description,
  }
}
```

## Access Control & Security

### Basic Access Control

Implement appropriate access control for collections:

```typescript
access: {
  read: () => true, // Public read access
  create: ({ req }) => req.user?.role === 'admin', // Only admins can create
  update: ({ req }) => req.user?.role === 'admin', // Only admins can update
  delete: ({ req }) => req.user?.role === 'admin', // Only admins can delete
}
```

### Field-Level Access Control

For sensitive fields, implement field-level access control:

```typescript
{
  name: 'internalNotes',
  type: 'text',
  access: {
    read: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
  }
}
```

## Rich Text & Media Handling

### Rich Text Configuration

Configure the Lexical rich text editor:

```typescript
// In payload.config.ts
editor: lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    BlocksFeature({
      blocks: [
        // Your custom blocks
      ],
    }),
  ],
}),
```

### Media Collection

Set up a proper media collection with image processing:

```typescript
import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
```

## Admin UI Customization

### Collection Admin Options

Customize the admin UI for collections:

```typescript
admin: {
  useAsTitle: 'title',
  defaultColumns: ['title', 'slug', 'updatedAt'],
  group: 'Content',
  description: 'Service pages for the HWC website',
  listSearchableFields: ['title', 'slug', 'serviceType'],
}
```

### Custom Components

Add custom components to enhance the admin experience:

```typescript
admin: {
  components: {
    BeforeListTable: [CustomFilterComponent],
    AfterDashboard: [RecentActivityComponent],
  }
}
```

## Performance Optimization

### Caching Strategies

Implement effective caching strategies:

1. Use React's `cache()` function for data fetching functions
2. Set appropriate `depth` values in queries (usually 1-2 is sufficient)
3. Use `select` to limit fields when fetching large collections

### Query Optimization

Optimize your database queries:

```typescript
const { docs } = await payload.find({
  collection: 'service-pages',
  where: {
    slug: {
      equals: params.slug,
    },
    status: {
      equals: 'published',
    },
  },
  depth: 2,
  limit: 1,
  sort: '-createdAt',
})
```

### Nullish Coalescing

Use nullish coalescing (`??`) instead of logical OR (`||`):

```typescript
// ❌ Bad
const description = service.meta?.description || 'Default description'

// ✅ Good
const description = service.meta?.description ?? 'Default description'
```

---

## Conclusion

By following these best practices, we'll ensure that our HWC website implementation aligns with Payload v3 standards and takes full advantage of the hybrid architecture with Next.js. This approach will result in a maintainable, type-safe, and performant website that can be easily extended and managed.

Remember to run `pnpm payload generate:types` whenever you make changes to your Payload configuration to keep your TypeScript types in sync with your content model.
