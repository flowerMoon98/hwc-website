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
    <>
      {/* Using visually-hidden for accessibility while letting hero block serve as visual title */}
      {page.title && (
        <h1 className="sr-only">{page.title}</h1>
      )}
      <div className="page-content">
        {page.layout && page.layout.length > 0 ? (
          <RenderBlock 
            blocks={page.layout}
            className="blocks-container" 
          />
        ) : (
          <div className="container mx-auto py-16 px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Page Under Construction</h2>
            <p className="mb-8 text-gray-600">This page has no content blocks yet.</p>
          </div>
        )}
      </div>
    </>
  )
}
