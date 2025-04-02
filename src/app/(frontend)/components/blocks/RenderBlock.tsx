'use client'

// src/app/(frontend)/components/blocks/RenderBlock.tsx
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import type { Page } from '@/payload-types'

// Import block components - adjust these based on how each component is actually exported
import { ContactFormBlock as ContactForm } from './ContactForm'
import Content from './Content'
import Hero from './Hero'
import Intro from './Intro'
import OurNiche from './OurNiche'
import Testimonials from './Testimonial' // File is named Testimonial.tsx but exports Testimonials component

// Define a simpler approach to block types
type BlockComponentsType = {
  hero: typeof Hero
  content: typeof Content
  contactForm: typeof ContactForm
  intro: typeof Intro
  ourNiche: typeof OurNiche
  testimonials: typeof Testimonials
}

// Map block types to their respective components
const blockComponents: BlockComponentsType = {
  hero: Hero,
  content: Content,
  contactForm: ContactForm,
  intro: Intro,
  ourNiche: OurNiche,
  testimonials: Testimonials,
}

export type RenderBlockProps = {
  blocks: Page['layout'] | null | undefined
  className?: string
}

// Fall back component for error handling
const BlockErrorFallback = ({
  error,
  componentStack,
  resetErrorBoundary,
}: {
  error: Error
  componentStack: string
  resetErrorBoundary: () => void
}) => {
  console.error('Block rendering error:', error, componentStack)

  return (
    <div className="p-4 my-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
      <h4 className="font-bold">Block failed to render</h4>
      {process.env.NODE_ENV === 'development' && (
        <details>
          <summary>Technical details</summary>
          <p>{error.message}</p>
        </details>
      )}
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded text-sm"
      >
        Try again
      </button>
    </div>
  )
}

export const RenderBlock: React.FC<RenderBlockProps> = ({ blocks, className }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null
  }
  console.log('Block data:', blocks)

  return (
    <div className={className || 'blocks-container'}>
      {blocks.map((block, index) => {
        // Type guard to ensure blockType is a valid key
        const blockType = block.blockType as keyof BlockComponentsType
        const BlockComponent = blockComponents[blockType]

        if (!BlockComponent) {
          console.warn(`Block of type '${block.blockType}' is not supported.`)
          return null // Don't render anything for unsupported blocks in production
        }

        // Hero blocks need special treatment - they should be at the top with no spacing
        const isHeroBlock = blockType === 'hero'
        // First non-hero block shouldn't have spacing
        const isFirstNonHeroBlock = index === 0 && !isHeroBlock
        // Determine if we need spacing
        const needsSpacing = !isHeroBlock && !isFirstNonHeroBlock && index > 0

        return (
          <ErrorBoundary
            key={`block-${block.blockType}-${index}`}
            FallbackComponent={BlockErrorFallback}
            onReset={() => {
              // Reset the error state when "Try again" is clicked
              console.log('Attempting to reset block:', blockType, index)
            }}
          >
            <div className={needsSpacing ? 'block-spacing' : ''}>
              {/* Use the BlockComponent variable we already have */}
              <BlockComponent {...(block as any)} />
            </div>
          </ErrorBoundary>
        )
      })}
    </div>
  )
}
