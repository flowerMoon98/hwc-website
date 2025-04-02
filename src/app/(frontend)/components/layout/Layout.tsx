// src/app/(frontend)/components/layout/Layout.tsx
'use client'

import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import type { Header as HeaderType, Footer as FooterType } from '@/payload-types'

type LayoutProps = {
  children: React.ReactNode
  header: HeaderType
  footer: FooterType
}

// Named export (keep this)
export const Layout: React.FC<LayoutProps> = ({ children, header, footer }) => {
  const mainPaddingTopClass = 'pt-24' // Adjust as needed

  return (
    <div className="flex flex-col min-h-screen">
      <Header header={header} />
      <main className={`flex-grow ${mainPaddingTopClass}`}>{children}</main>
      <Footer footer={footer} />
    </div>
  )
}

// Add this default export back
export default Layout
