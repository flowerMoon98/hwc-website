'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types' // Adjust path if needed

type HeroProps = {
  heading: string
  subheading?: string | null
  image: string | Media | null | undefined
  ctaButton?: {
    label?: string | null
    link?: string | null
  } | null
}

const Hero: React.FC<HeroProps> = ({ heading, subheading, image, ctaButton }) => {
  // Safely extract image URL and alt text
  let imageUrl: string | null = null
  let imageAlt: string = 'Hero background'

  if (typeof image === 'string') {
    imageUrl = image
  } else if (image && typeof image === 'object') {
    imageUrl = image.sizes?.hero?.url || image.url || null
    imageAlt = image.alt || imageAlt
  }

  // Function to determine if a link is internal or external
  const isExternalLink = (url: string) => {
    if (!url) return false
    return url.startsWith('http') || url.startsWith('https') || url.startsWith('//')
  }

  console.log('CTA Button data:', ctaButton)

  return (
    <section className="relative w-full h-[600px] bg-gray-900 text-white overflow-hidden border-b border-gray-800">
      {/* Background image with gradient overlay */}
      {imageUrl && (
        <>
          {/* Background image - Note the position: relative */}
          <div className="absolute inset-0" style={{ position: 'absolute' }}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              quality={90}
              className="object-cover object-center"
              style={{ opacity: 0.7 }}
            />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60 z-10"></div>
        </>
      )}

      {/* Content */}
      <div className="relative z-20 h-full container mx-auto px-6 flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-sm">
            {heading}
          </h1>

          {subheading && (
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}

          {ctaButton?.label && ctaButton?.link && (
            <div className="mt-8">
              {isExternalLink(ctaButton.link) ? (
                <a
                  href={ctaButton.link}
                  className="inline-block px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ctaButton.label}
                </a>
              ) : (
                <Link
                  href={ctaButton.link || '/'}
                  className="inline-block px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {ctaButton.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
