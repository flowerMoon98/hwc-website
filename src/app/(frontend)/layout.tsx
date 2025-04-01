import React from 'react'
import { Inter } from 'next/font/google'
import { getGlobals } from './lib/globals'
import { Layout } from './components/layout/Layout'
import './styles.css'

// Load Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'HWC - Hybrid Wealth Consultants',
  description: 'Professional services for insurance, accounting, wealth management, healthcare planning, and property.',
}

export default async function RootLayout(props: { readonly children: React.ReactNode }) {
  const { children } = props
  
  // Fetch global header and footer data
  const { header, footer } = await getGlobals()

  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-white text-gray-900 antialiased">
        <Layout header={header} footer={footer}>
          {children}
        </Layout>
      </body>
    </html>
  )
}
