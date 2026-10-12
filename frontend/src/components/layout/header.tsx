'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { Menu, X, Calendar, Users, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  { label: 'Rooms & Suites', href: '/rooms' },
  { label: 'Dining', href: '/dining' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent, item: NavItem) => {
    if (item.children && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setActiveDropdown(activeDropdown === item.label ? null : item.label)
    }
    if (e.key === 'Escape') {
      setActiveDropdown(null)
    }
  }

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out',
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md border-b border-border-subtle shadow-soft'
          : 'bg-transparent',
      )}
      role="banner"
    >
      <nav className="container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20 lg:h-24 gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 font-display text-heading-sm font-medium text-charcoal hover:opacity-80 transition-opacity"
            aria-label="Mwanza Hotel - Home"
          >
            <span className="text-brass" aria-hidden="true">M</span>
            <span className="tracking-wider uppercase hidden sm:inline">wanza Hotel</span>
            <span className="text-caption text-text-muted font-body uppercase tracking-widest">Lake Victoria</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        onKeyDown={(e) => handleKeyDown(e, item)}
                        className={clsx(
                          'flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-body-sm font-medium transition-all duration-200',
                          'hover:bg-limestone hover:text-charcoal',
                          activeDropdown === item.label && 'bg-limestone text-charcoal',
                        )}
                        aria-expanded={activeDropdown === item.label}
                        aria-haspopup="true"
                        aria-controls={`${item.label}-dropdown`}
                      >
                        {item.label}
                        <ChevronDown className={clsx('h-4 w-4 transition-transform', activeDropdown === item.label && 'rotate-180')} aria-hidden="true" />
                      </button>
                      {activeDropdown === item.label && (
                        <div
                          id={`${item.label}-dropdown`}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl border border-border-subtle shadow-strong p-2 animate-slide-down"
                          role="menu"
                        >
                          {item.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-3 py-2 rounded-lg text-body-sm text-text-secondary hover:bg-limestone hover:text-charcoal transition-colors"
                              role="menuitem"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-4 py-2.5 rounded-lg text-body-sm font-medium text-text-secondary hover:bg-limestone hover:text-charcoal transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Book Now Button - Desktop */}
            <Link href="/booking" className="hidden lg:inline-flex">
              <Button variant="brass" size="md">
                Check Availability
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-charcoal hover:bg-limestone transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden overflow-hidden border-t border-border-subtle bg-ivory animate-slide-down"
            role="navigation"
            aria-label="Mobile menu"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className={clsx(
                          'flex items-center justify-between w-full px-3 py-3 rounded-lg text-body font-medium transition-colors',
                          'text-charcoal hover:bg-limestone',
                          activeDropdown === item.label && 'bg-limestone',
                        )}
                        aria-expanded={activeDropdown === item.label}
                      >
                        {item.label}
                        <ChevronDown className={clsx('h-5 w-5 transition-transform', activeDropdown === item.label && 'rotate-180')} aria-hidden="true" />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="pl-3 mt-1 space-y-1 animate-fade-in">
                          {item.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-3 py-2 rounded-lg text-body-sm text-text-secondary hover:bg-limestone/50 hover:text-charcoal transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-3 rounded-lg text-body font-medium text-text-secondary hover:bg-limestone hover:text-charcoal transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <hr className="my-3 border-border-subtle" />
              <Link href="/booking" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="brass" size="lg" fullWidth>
                  <Calendar className="h-5 w-5" aria-hidden="true" />
                  Check Availability
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}