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

export const Layout: React.FC<LayoutProps> = ({ children, header, footer }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header header={header} />
      <main className="flex-grow pt-24">{children}</main>
      <Footer footer={footer} />
    </div>
  )
}

export default Layout
