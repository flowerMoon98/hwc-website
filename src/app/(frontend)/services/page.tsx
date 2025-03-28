// src/app/(frontend)/services/page.tsx
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { cache } from 'react'
import { getPayloadClient } from '@/payload/getPayloadClient'
import type { ServicePage } from '@/payload-types'

// Cache the getServicePages function to improve performance
const getServicePages = cache(async (): Promise<ServicePage[]> => {
  const payload = await getPayloadClient()
  
  const { docs } = await payload.find({
    collection: 'service-pages',
    limit: 100,
    depth: 1,
  })
  
  return docs as ServicePage[]
})

export const metadata: Metadata = {
  title: 'Our Services | HWC',
  description: 'Explore our comprehensive range of professional services',
}

export default async function ServicesPage() {
  const services = await getServicePages()
  
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      
      {services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No services available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              key={service.id} 
              href={`/services/${service.slug}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-teal-600">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">
                    {service.meta?.description ?? 'Learn more about our service offerings'}
                  </p>
                  <div className="mt-4 text-teal-600 font-medium group-hover:underline">
                    Learn more →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
