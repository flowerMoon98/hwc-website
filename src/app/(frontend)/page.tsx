import React from 'react'
import { Metadata } from 'next'
import { cache } from 'react'
import { RenderBlock } from '@/app/(frontend)/components/blocks/RenderBlock'
import { getPayloadClient } from '@/payload/getPayloadClient'
import type { Page } from '@/payload-types'
import Link from 'next/link'

// Cache the getHomePage function to improve performance
const getHomePage = cache(async (): Promise<Page | null> => {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    depth: 2, // Adjust depth as needed for nested relationships
  })

  if (!docs || docs.length === 0) {
    return null
  }

  return docs[0] as Page
})

export const metadata: Metadata = {
  title: 'HWC - Hybrid Wealth Consultants',
  description:
    'Professional services for insurance, accounting, wealth management, healthcare planning, and property.',
}

export default async function HomePage() {
  const homePage = await getHomePage()

  if (!homePage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-4 py-10 max-w-lg">
          <h1 className="text-3xl font-bold mb-4">Welcome to HWC</h1>
          <p className="mb-8 text-gray-600">The home page content has not been created yet.</p>
          <div className="flex justify-center">
            <Link
              href="/admin"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Go to Admin Panel
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Using visually-hidden for the title to maintain SEO value
  // while allowing the hero block to visually serve as the page title
  return (
    <>
      {homePage.title && (
        <h1 className="sr-only">{homePage.title}</h1>
      )}
      <div className="page-content">
        <RenderBlock 
          blocks={homePage.layout}
          className="blocks-container" 
        />
      </div>
    </>
  )
}
