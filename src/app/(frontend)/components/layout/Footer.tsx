'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Footer as FooterType } from '@/payload-types'

type FooterProps = {
  footer: FooterType
}

export const Footer: React.FC<FooterProps> = ({ footer }) => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Footer top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and brief description in first column */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center mr-2">
                {/* Replace with your actual logo */}
                <Image
                  src="/logo.svg"
                  alt="HWC Logo"
                  width={24}
                  height={24}
                  style={{ width: 'auto', height: 'auto' }}
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-xl">HWC™</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Professional services for insurance, accounting, wealth management, healthcare planning, and property.
            </p>
          </div>
          
          {/* Dynamic footer columns from CMS */}
          {footer?.columns?.map((column, index) => (
            <div key={`footer-column-${column.title}-${index}`}>
              <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links?.map((link) => (
                  <li key={`footer-link-${link.label}-${link.link}`}>
                    <Link 
                      href={link.link} 
                      className="text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              {footer?.copyrightText 
                ? footer.copyrightText.replace('{year}', currentYear.toString())
                : `&copy; ${currentYear} Hybrid Wealth Consultants. All rights reserved.`}
            </p>
            
            {/* Social media links */}
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
