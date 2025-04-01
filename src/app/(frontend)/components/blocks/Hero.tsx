'use client'

// src/app/(frontend)/components/blocks/Hero.tsx
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/Button'
import type { Media } from '@/payload-types'

// Define props based on the Hero.ts block schema
type HeroProps = {
  heading: string
  subheading?: string | null
  image: string | Media
  ctaButton?: {
    label?: string | null
    link?: string | null
  }
}

const Hero: React.FC<HeroProps> = ({ heading, subheading, image, ctaButton }) => {
  // Handle both string (URL) and Media object formats for image
  const imageUrl = typeof image === 'string' 
    ? image 
    : image?.url ?? '';

  console.log('Hero props:', { heading, subheading, imageUrl, ctaButton });

  return (
    <section className="relative h-[70vh] w-full">
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0" style={{ position: 'absolute' }}>
          <Image
            src={imageUrl}
            alt={typeof image !== 'string' && image?.alt ? image.alt : 'Hero background'}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative h-full flex items-center" style={{ position: 'relative', zIndex: 10 }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-4">{heading}</h1>
            {subheading && <p className="text-xl mb-8">{subheading}</p>}
            {ctaButton?.label && ctaButton?.link && (
              <Button
                href={ctaButton.link}
                className="rounded-full px-8 py-3 bg-teal-500 hover:bg-teal-600 transition-colors"
              >
                {ctaButton.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
