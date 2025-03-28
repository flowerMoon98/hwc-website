// src/app/(frontend)/components/blocks/OurNiche.tsx
'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

// Define props based on the OurNiche.ts block schema
type OurNicheProps = {
  title: string
  description?: string
  cards: {
    title: string
    description: string
    image?: {
      url: string
      alt?: string
    }
  }[]
}

const OurNiche: React.FC<OurNicheProps> = ({ title, description, cards }) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Handle the infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const { top } = sliderRef.current.getBoundingClientRect()
        setScrollPosition(-top)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sticky content */}
          <div className="md:w-1/2 md:sticky md:top-24 md:self-start">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {description && <p className="text-lg text-gray-600">{description}</p>}
          </div>

          {/* Scrolling cards */}
          <div ref={sliderRef} className="md:w-1/2 space-y-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-[1.02]"
                style={{
                  transform: `translateY(${Math.sin(scrollPosition / 200 + index) * 10}px)`,
                }}
              >
                {card.image?.url && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={card.image.url}
                      alt={card.image.alt || card.title}
                      width={500}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurNiche
