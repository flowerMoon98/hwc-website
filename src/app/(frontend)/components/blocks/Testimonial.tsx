// src/app/(frontend)/components/blocks/Testimonials.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'

// Define props based on the Testimonials.ts block schema
type TestimonialsProps = {
  heading: string
  testimonials: {
    quote: string
    author: string
    company?: string
    image?: {
      url: string
      alt?: string
    }
  }[]
}

const Testimonials: React.FC<TestimonialsProps> = ({ heading, testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial slider */}
          <div className="relative bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Author image */}
              {testimonials[activeIndex].image?.url && (
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <Image
                    src={testimonials[activeIndex].image.url}
                    alt={testimonials[activeIndex].image.alt || testimonials[activeIndex].author}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              )}

              {/* Quote content */}
              <div>
                <blockquote className="text-lg md:text-xl italic mb-4">
                  &quot{testimonials[activeIndex].quote}
                </blockquote>
                <div className="font-bold">{testimonials[activeIndex].author}</div>
                {testimonials[activeIndex].company && (
                  <div className="text-gray-600">{testimonials[activeIndex].company}</div>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            {testimonials.length > 1 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  aria-label="Next testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Dots indicator */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-teal-500' : 'bg-gray-300'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
