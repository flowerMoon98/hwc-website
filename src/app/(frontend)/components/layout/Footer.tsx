'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Footer as FooterType } from '@/payload-types'
// Import icons from react-icons (make sure to install react-icons with: npm install react-icons)
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FiLayers, FiInfo, FiMail, FiFileText, FiShield } from 'react-icons/fi'

// Mapping for social and category icons using React Icons
const iconMapping = {
  // Social Media Icons
  linkedin: <FaLinkedin className="w-5 h-5" />,
  twitter: <FaTwitter className="w-5 h-5" />,
  facebook: <FaFacebook className="w-5 h-5" />,
  instagram: <FaInstagram className="w-5 h-5" />,
  youtube: <FaYoutube className="w-5 h-5" />,
  // Category Icons for footer links
  services: <FiLayers className="w-4 h-4 mr-1 inline-block" />,
  about: <FiInfo className="w-4 h-4 mr-1 inline-block" />,
  contact: <FiMail className="w-4 h-4 mr-1 inline-block" />,
  resources: <FiFileText className="w-4 h-4 mr-1 inline-block" />,
  legal: <FiShield className="w-4 h-4 mr-1 inline-block" />,
}

// Helper function to get an icon based on a link title
const getIconForLink = (title: string) => {
  title = title.toLowerCase()
  if (title.includes('service')) return iconMapping.services
  if (title.includes('about')) return iconMapping.about
  if (title.includes('contact')) return iconMapping.contact
  if (title.includes('resource') || title.includes('news')) return iconMapping.resources
  if (title.includes('legal') || title.includes('policy') || title.includes('terms'))
    return iconMapping.legal
  return null
}

type FooterProps = {
  footer: FooterType
}

export const Footer: React.FC<FooterProps> = ({ footer }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-1">
        {/* Footer top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and description */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center mr-2 shrink-0">
                <Image
                  src="/logo.svg"
                  alt="HWC Logo"
                  width={20}
                  height={20}
                  className="object-contain sm:w-6 sm:h-6"
                />
              </div>
              <span className="text-white font-bold text-lg sm:text-xl">HWC™</span>
            </Link>
            <p className="text-gray-400 text-sm">
              {footer?.tagline ||
                'Professional services for insurance, accounting, wealth management, healthcare planning, and property.'}
            </p>
          </div>

          {/* Dynamic footer columns */}
          {footer?.columns?.map((column, index) =>
            column.title ? (
              <div key={`footer-column-${column.title}-${index}`}>
                <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links?.map(
                    (linkItem) =>
                      linkItem?.label &&
                      linkItem?.link && (
                        <li key={`footer-link-${linkItem.label}-${linkItem.link}`}>
                          <Link
                            href={linkItem.link}
                            className="text-gray-400 hover:text-teal-400 transition-colors text-sm flex items-center"
                          >
                            {getIconForLink(linkItem.label) || getIconForLink(column.title)}
                            {linkItem.label}
                          </Link>
                        </li>
                      ),
                  )}
                </ul>
              </div>
            ) : null,
          )}
        </div>

        {/* Footer bottom section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              {footer?.copyrightText
                ? footer.copyrightText.replace('{year}', currentYear.toString())
                : `© ${currentYear} Hybrid Wealth Consultants. All rights reserved.`}
            </p>
            {Array.isArray(footer?.socialLinks) && footer.socialLinks.length > 0 && (
              <div className="flex space-x-3 sm:space-x-4">
                {footer.socialLinks.map((socialLink, index) => {
                  if (!socialLink.platform || !socialLink.url) return null
                  const IconComponent =
                    iconMapping[socialLink.platform as keyof typeof iconMapping] || null

                  return (
                    <a
                      key={`social-link-${socialLink.platform}-${index}`}
                      href={socialLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-teal-400 transition-colors transform hover:scale-105"
                      aria-label={socialLink.platform}
                    >
                      {IconComponent}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
