// src/app/(frontend)/services/[slug]/page.tsx
import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { cache } from 'react'
import { RenderBlock } from '@/app/(frontend)/components/blocks/RenderBlock'
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

// Generate metadata for the page
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

// Main page component
export default async function ServicePage({ params }: { params: { slug: string } }) {
  const page = await getServicePage(params.slug)
  
  if (!page) {
    notFound()
  }
  
  return (
    <main className="service-page">
      <RenderBlock blocks={page.layout} />
    </main>
  )
}
