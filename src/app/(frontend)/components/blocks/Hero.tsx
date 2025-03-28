// src/app/(frontend)/components/blocks/Hero.tsx
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/Button'

// Define props based on the Hero.ts block schema
type HeroProps = {
  heading: string
  subheading?: string
  backgroundImage?: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  cta?: {
    label: string
    link: string
  }
}

const Hero: React.FC<HeroProps> = ({ heading, subheading, backgroundImage, cta }) => {
  return (
    <section className="relative h-[70vh] flex items-center">
      {/* Background Image */}
      {backgroundImage?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt || 'Hero background'}
            fill
            className="object-cover"
            priority
          />
          {/* Glassmorphic overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">{heading}</h1>
          {subheading && <p className="text-xl mb-8">{subheading}</p>}
          {cta && (
            <Button
              href={cta.link}
              className="rounded-full px-8 py-3 bg-teal-500 hover:bg-teal-600 transition-colors"
            >
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
