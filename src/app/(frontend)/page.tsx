import React from 'react'
import { Metadata } from 'next'
import { cache } from 'react'
import { RenderBlock } from '@/app/(frontend)/components/blocks/RenderBlock'
import { getPayloadClient } from '@/payload/getPayloadClient'
import type { Page } from '@/payload-types'
import Link from 'next/link'
import './styles.css'

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
  description: 'Professional services for insurance, accounting, wealth management, healthcare planning, and property.',
}

export default async function HomePage() {
  const homePage = await getHomePage()
  
  if (!homePage) {
    return (
      <main className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to HWC</h1>
        <p className="mb-8">The home page content has not been created yet.</p>
        <div className="flex justify-center">
          <Link 
            href="/admin" 
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-full"
          >
            Go to Admin Panel
          </Link>
        </div>
      </main>
    )
  }
  
  return (
    <main className="home-page">
      <RenderBlock blocks={homePage.layout} />
    </main>
  )
}
