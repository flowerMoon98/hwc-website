import { cache } from 'react'
import { getPayloadClient } from '@/payload/getPayloadClient'
import type { Header, Footer } from '@/payload-types'

// Default header data as fallback
const defaultHeader = {
  navItems: [
    {
      label: 'Home',
      link: '/',
    },
    {
      label: 'About',
      link: '/about',
    },
    {
      label: 'Services',
      link: '/services',
      submenu: [
        {
          label: 'Insurance',
          link: '/services/insurance',
        },
        {
          label: 'Accounting',
          link: '/services/accounting',
        },
        {
          label: 'Wealth Management',
          link: '/services/wealth',
        },
      ],
    },
    {
      label: 'Contact',
      link: '/contact',
    },
  ],
  ctaButton: {
    label: 'Get in touch',
    link: '/contact',
  },
}

// Default footer data as fallback
const defaultFooter = {
  columns: [
    {
      title: 'Company',
      links: [
        {
          label: 'About Us',
          link: '/about',
        },
        {
          label: 'Our Team',
          link: '/about#team',
        },
        {
          label: 'Contact',
          link: '/contact',
        },
      ],
    },
    {
      title: 'Services',
      links: [
        {
          label: 'Insurance',
          link: '/services/insurance',
        },
        {
          label: 'Accounting',
          link: '/services/accounting',
        },
        {
          label: 'Wealth Management',
          link: '/services/wealth',
        },
      ],
    },
  ],
  copyrightText: ' Hybrid Wealth Consultants. All rights reserved.',
}

// Cache the getGlobals function to improve performance
export const getGlobals = cache(async (): Promise<{
  header: Header
  footer: Footer
}> => {
  try {
    const payload = await getPayloadClient()
    
    // Fetch header global
    const headerResponse = await payload.findGlobal({
      slug: 'header',
    })
    
    // Fetch footer global
    const footerResponse = await payload.findGlobal({
      slug: 'footer',
    })
    
    return {
      header: headerResponse && Object.keys(headerResponse).length > 0 
        ? headerResponse 
        : defaultHeader as unknown as Header,
      footer: footerResponse && Object.keys(footerResponse).length > 0 
        ? footerResponse 
        : defaultFooter as unknown as Footer,
    }
  } catch (error) {
    console.error('Error fetching globals:', error)
    return {
      header: defaultHeader as unknown as Header,
      footer: defaultFooter as unknown as Footer,
    }
  }
})
