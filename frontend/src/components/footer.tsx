'use client'
import { ArrowUp, MapPin } from 'lucide-react'
import Link from 'next/link'

const footerLinks = [
  {
    title: 'Explore',
    items: [
      { label: 'Businesses', href: '/businesses' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Categories',
    items: [
      {
        label: 'Restaurants & Cafes',
        href: '/businesses?category=Restaurants+%26+Cafes',
      },
      {
        label: 'Hotels & Lodges',
        href: '/businesses?category=Hotels+%26+Lodges',
      },
      {
        label: 'Tours & Activities',
        href: '/businesses?category=Tours+%26+Activities',
      },
    ],
  },
]

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#111827]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
                <MapPin size={20} color="#fff" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Mwanza
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Your guide to the best businesses and events in Mwanza, Tanzania
              — on the shores of Lake Victoria.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h6 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-300">
                {section.title}
              </h6>
              <ul className="space-y-3">
                {section.items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-gray-400 transition-colors duration-150 hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-[#0D1117]">
        <button
          onClick={scrollToTop}
          className="absolute -top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#111827] bg-primary text-white shadow-lg transition-transform hover:scale-110 active:scale-95 md:right-12"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Mwanza Directory
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
