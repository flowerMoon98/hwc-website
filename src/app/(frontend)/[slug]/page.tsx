import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { RenderBlock } from '@/app/(frontend)/components/blocks/RenderBlock'
import { getPayloadClient } from '@/payload/getPayloadClient'
import type { Page } from '@/payload-types'

// Cache the getPage function to improve performance
const getPage = cache(async (slug: string): Promise<Page | null> => {
  const payload = await getPayloadClient()
  
  const { docs } = await payload.find({
    collection: 'pages',
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
  
  return docs[0] as Page
})

type Props = {
  params: {
    slug: string
  }
}

// Generate metadata for the page
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props
  const slug = params.slug
  
  const page = await getPage(slug)
  
  if (!page) {
    return {
      title: 'Page Not Found | HWC',
      description: 'The requested page could not be found.',
    }
  }
  
  return {
    title: `${page.title} | HWC`,
    description: page.meta?.description || 'Hybrid Wealth Consultants',
  }
}

// Dynamic page component
export default async function DynamicPage(props: Props) {
  const { params } = props
  const slug = params.slug
  
  const page = await getPage(slug)
  
  if (!page) {
    notFound()
  }
  
  return (
    <main className="min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
        {page.layout && page.layout.length > 0 ? (
          <RenderBlock blocks={page.layout} />
        ) : (
          <p>This page has no content blocks.</p>
        )}
      </div>
    </main>
  )
}
