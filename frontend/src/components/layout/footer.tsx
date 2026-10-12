'use client'

import Link from 'next/link'
import { clsx } from 'clsx'
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const footerLinks = {
  stay: [
    { label: 'Rooms & Suites', href: '/rooms' },
    { label: 'Special Offers', href: '/offers' },
    { label: 'Group Bookings', href: '/groups' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
  dining: [
    { label: 'Restaurants', href: '/dining' },
    { label: 'Bars & Lounge', href: '/bars' },
    { label: 'Private Dining', href: '/private-dining' },
    { label: 'In-Room Dining', href: '/in-room-dining' },
  ],
  experiences: [
    { label: 'Lake Victoria Tours', href: '/experiences/lake-victoria' },
    { label: 'Cultural Excursions', href: '/experiences/cultural' },
    { label: 'Wellness & Spa', href: '/experiences/wellness' },
    { label: 'Adventure Activities', href: '/experiences/adventure' },
  ],
  hotel: [
    { label: 'Our Story', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Manage Booking', href: '/manage-booking' },
    { label: 'Policies', href: '/policies' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/mwanza.hotel', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/mwanza.hotel', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/mwanza_hotel', label: 'Twitter' },
]

const contactInfo = {
  address: 'Capri Point, Mwanza, Tanzania',
  phone: '+255 28 250 0000',
  email: 'reservations@mwanza-hotel.com',
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-ivory" role="contentinfo">
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-heading-sm font-medium text-ivory hover:opacity-80 transition-opacity"
              aria-label="Mwanza Hotel - Home"
            >
              <span className="text-brass" aria-hidden="true">M</span>
              <span className="tracking-wider uppercase">wanza Hotel</span>
            </Link>
            <p className="text-body-sm text-limestone-dark max-w-xs leading-relaxed">
              Refined hospitality on the shores of Lake Victoria. Where architecture, nature, and genuine service converge.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-limestone/10 text-limestone-dark hover:bg-limestone/20 hover:text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass/40"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <nav aria-label="Stay" className="space-y-3">
            <h3 className="font-display text-heading-sm font-medium text-ivory">Stay</h3>
            <ul className="space-y-2" role="list">
              {footerLinks.stay.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-limestone-dark hover:text-brass-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Dining" className="space-y-3">
            <h3 className="font-display text-heading-sm font-medium text-ivory">Dining</h3>
            <ul className="space-y-2" role="list">
              {footerLinks.dining.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-limestone-dark hover:text-brass-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Experiences" className="space-y-3">
            <h3 className="font-display text-heading-sm font-medium text-ivory">Experiences</h3>
            <ul className="space-y-2" role="list">
              {footerLinks.experiences.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-limestone-dark hover:text-brass-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Hotel" className="space-y-3">
            <h3 className="font-display text-heading-sm font-medium text-ivory">Hotel</h3>
            <ul className="space-y-2" role="list">
              {footerLinks.hotel.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-limestone-dark hover:text-brass-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support" className="space-y-3">
            <h3 className="font-display text-heading-sm font-medium text-ivory">Support</h3>
            <ul className="space-y-2" role="list">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-limestone-dark hover:text-brass-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact & Newsletter */}
        <div className="mt-16 lg:mt-20 pt-10 lg:pt-12 border-t border-limestone/10">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-display text-heading-sm font-medium text-ivory">Contact Us</h3>
              <address className="not-italic space-y-3 text-body-sm text-limestone-dark">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-brass" aria-hidden="true" />
                  <span>{contactInfo.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-brass" aria-hidden="true" />
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-brass-light transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-brass" aria-hidden="true" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-brass-light transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </address>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="font-display text-heading-sm font-medium text-ivory">Stay Connected</h3>
              <p className="text-body-sm text-limestone-dark">
                Receive seasonal offers, exclusive experiences, and news from Mwanza Hotel.
              </p>
              <form className="flex flex-col sm:flex-row gap-2" action="/api/newsletter" method="POST">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-limestone/10 border border-limestone/20 text-charcoal placeholder:text-limestone-dark focus:outline-none focus:ring-2 focus:ring-brass/40 focus:border-transparent transition-all"
                />
                <Button type="submit" variant="primary" size="md">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Subscribe</span>
                </Button>
              </form>
              <p className="text-micro text-limestone/50">
                By subscribing, you agree to our <a href="/privacy" className="underline hover:text-brass-light">Privacy Policy</a>.
              </p>
            </div>

            {/* Book Direct */}
            <div className="space-y-4">
              <h3 className="font-display text-heading-sm font-medium text-ivory">Book Direct Benefits</h3>
              <ul className="space-y-2 text-body-sm text-limestone-dark" role="list">
                <li className="flex items-start gap-2">
                  <svg className="h-4 w-4 flex-shrink-0 mt-0.5 text-brass" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Best rate guarantee
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-4 w-4 flex-shrink-0 mt-0.5 text-brass" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Complimentary breakfast
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-4 w-4 flex-shrink-0 mt-0.5 text-brass" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Room upgrade (subject to availability)
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-4 w-4 flex-shrink-0 mt-0.5 text-brass" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Flexible cancellation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-limestone/10">
        <div className="container py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <p className="text-caption text-limestone/50">
              © {currentYear} Mwanza Hotel. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-caption text-limestone/50">
              <Link href="/privacy" className="hover:text-brass-light transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-brass-light transition-colors">Terms & Conditions</Link>
              <Link href="/cookies" className="hover:text-brass-light transition-colors">Cookie Policy</Link>
              <Link href="/accessibility" className="hover:text-brass-light transition-colors">Accessibility Statement</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}