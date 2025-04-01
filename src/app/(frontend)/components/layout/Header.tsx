'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'

type HeaderProps = {
  header: HeaderType
}

export const Header: React.FC<HeaderProps> = ({ header }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null)
  const pathname = usePathname()

  // Handle scroll effect for glassmorphic header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Toggle submenu
  const toggleSubmenu = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-800/80 backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {header?.navItems?.map((item, index) => {
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const isActive = pathname === item.link

            return (
              <div key={`nav-item-${index}`} className="relative group">
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={`px-4 py-2 rounded-full text-white hover:bg-white/10 flex items-center ${
                        isActive ? 'bg-white/20' : ''
                      }`}
                    >
                      {item.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        {item.submenu?.map((subItem, subIndex) => (
                          <Link
                            key={`submenu-item-${subIndex}`}
                            href={subItem.link}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.link}
                    className={`px-4 py-2 rounded-full text-white hover:bg-white/10 ${
                      isActive ? 'bg-white/20' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            )
          })}

          {/* CTA Button */}
          {header?.ctaButton?.label && header?.ctaButton?.link && (
            <Link
              href={header.ctaButton.link}
              className="ml-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-colors"
            >
              {header.ctaButton.label}
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-3">
              {header?.navItems?.map((item, index) => {
                const hasSubmenu = item.submenu && item.submenu.length > 0
                const isActive = pathname === item.link

                return (
                  <div key={`mobile-nav-${index}`}>
                    {hasSubmenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(index)}
                          className={`px-4 py-2 text-left text-white flex justify-between items-center w-full ${
                            isActive ? 'bg-white/10' : ''
                          }`}
                        >
                          {item.label}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 transition-transform ${
                              activeSubmenu === index ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {activeSubmenu === index && (
                          <div className="pl-4 mt-1 border-l-2 border-teal-500">
                            {item.submenu?.map((subItem, subIndex) => (
                              <Link
                                key={`mobile-submenu-${subIndex}`}
                                href={subItem.link}
                                className="block px-4 py-2 text-white hover:bg-white/10"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.link}
                        className={`block px-4 py-2 text-white hover:bg-white/10 ${
                          isActive ? 'bg-white/10' : ''
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                )
              })}

              {/* Mobile CTA Button */}
              {header?.ctaButton?.label && header?.ctaButton?.link && (
                <Link
                  href={header.ctaButton.link}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-center mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {header.ctaButton.label}
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
