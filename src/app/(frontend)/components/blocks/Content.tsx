// src/app/(frontend)/components/blocks/Content.tsx
import React from 'react'
import Image from 'next/image'

// Define props based on the Content.ts block schema
type ContentProps = {
  heading?: string
  content: string
  image?: {
    url: string
    alt?: string
  }
  layout?: 'contentLeft' | 'contentRight' | 'contentOnly'
}

const Content: React.FC<ContentProps> = ({ heading, content, image, layout = 'contentOnly' }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div
          className={`
          flex flex-col gap-8
          ${layout === 'contentLeft' ? 'md:flex-row' : ''}
          ${layout === 'contentRight' ? 'md:flex-row-reverse' : ''}
        `}
        >
          {/* Content */}
          <div
            className={`
            ${(layout === 'contentLeft' || layout === 'contentRight') && image ? 'md:w-1/2' : 'w-full'}
          `}
          >
            {heading && <h2 className="text-3xl font-bold mb-6">{heading}</h2>}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          {/* Image */}
          {image?.url && (layout === 'contentLeft' || layout === 'contentRight') && (
            <div className="md:w-1/2 flex items-center justify-center">
              <Image
                src={image.url}
                alt={image.alt || ''}
                width={600}
                height={400}
                className="rounded-lg shadow-md object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Content
