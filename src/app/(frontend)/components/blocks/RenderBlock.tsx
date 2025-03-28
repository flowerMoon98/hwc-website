// src/app/(frontend)/components/blocks/RenderBlock.tsx
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Page } from '../../../../payload-types'

// Import block components - adjust these based on how each component is actually exported
import { ContactFormBlock as ContactForm } from './ContactForm'
import Content from './Content'
import Hero from './Hero'
import Intro from './Intro'
import OurNiche from './OurNiche'
import Testimonials from './Testimonial' // File is named Testimonial.tsx but exports Testimonials component

// Type for blocks from payload-types.ts
type BlockType = Extract<Page['layout'][number], { blockType: string }>

// Map block types to their respective components
const blockComponents: Record<string, React.ComponentType<BlockType>> = {
  hero: Hero,
  content: Content,
  contactForm: ContactForm,
  intro: Intro,
  ourNiche: OurNiche,
  testimonials: Testimonials,
}

export type RenderBlockProps = {
  blocks: BlockType[] | null | undefined
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

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const BlockComponent = blockComponents[block.blockType as keyof typeof blockComponents]

        if (!BlockComponent) {
          console.warn(`Block of type '${block.blockType}' is not supported.`)
          return (
            <div key={`unsupported-${index}`} className="hidden">
              Unsupported block type: {block.blockType}
            </div>
          )
        }

        return (
          <ErrorBoundary
            key={`block-${block.blockType}-${index}`}
            FallbackComponent={BlockErrorFallback}
            onReset={() => {
              // Reset the error state when "Try again" is clicked
              // You could potentially re-fetch data here if needed
            }}
          >
            <div className={index > 0 ? 'block-spacing' : ''}>
              <BlockComponent {...block} />
            </div>
          </ErrorBoundary>
        )
      })}
    </div>
  )
}
