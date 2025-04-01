'use client'

import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4 text-teal-600">404</h1>
        <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
        <p className="mb-8 text-gray-600 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center">
          <Link 
            href="/" 
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-full"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
