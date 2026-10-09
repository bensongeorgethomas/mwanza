'use client'
import { MenuIcon, XIcon, MapPin } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { title: 'Home', href: '/' },
  { title: 'Businesses', href: '/businesses' },
  { title: 'Events', href: '/events' },
]

const Navbar = () => {
  const [showNav, setShowNav] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
            <MapPin size={20} color="#fff" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-text-primary">
            Mwanza
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ title, href }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                }`}
              >
                {title}
              </Link>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setShowNav(!showNav)}
          aria-label="Toggle Menu"
          className="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
        >
          {showNav ? (
            <XIcon size={22} strokeWidth={2.5} />
          ) : (
            <MenuIcon size={22} strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      <div
        className={`overflow-hidden border-t border-border transition-all duration-300 ease-in-out md:hidden ${
          showNav ? 'max-h-60' : 'max-h-0 border-t-0'
        }`}
      >
        <div className="flex flex-col gap-1 bg-white px-4 py-3">
          {navLinks.map(({ title, href }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setShowNav(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-gray-100'
                }`}
              >
                {title}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
