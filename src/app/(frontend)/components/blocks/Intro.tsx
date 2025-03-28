// src/app/(frontend)/components/blocks/Intro.tsx
import React from 'react'

// Define props based on the Intro.ts block schema
type IntroProps = {
  heading: string
  content: string
  alignment?: 'left' | 'center' | 'right'
}

const Intro: React.FC<IntroProps> = ({ heading, content, alignment = 'left' }) => {
  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[alignment]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl mx-auto ${textAlignClass}`}>
          <h2 className="text-3xl font-bold mb-6">{heading}</h2>
          <div
            className="text-lg text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  )
}

export default Intro
