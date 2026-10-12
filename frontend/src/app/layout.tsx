import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Mwanza Hotel — Lake Victoria Luxury Accommodation',
    template: '%s | Mwanza Hotel',
  },
  description: 'Experience refined hospitality on the shores of Lake Victoria. Luxury rooms, suites, dining, and bespoke experiences in Mwanza, Tanzania.',
  keywords: ['luxury hotel', 'Mwanza', 'Lake Victoria', 'Tanzania', 'accommodation', 'booking'],
  authors: [{ name: 'Mwanza Hotel' }],
  creator: 'Mwanza Hotel',
  publisher: 'Mwanza Hotel',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mwanza-hotel.com',
    siteName: 'Mwanza Hotel',
    title: 'Mwanza Hotel — Lake Victoria Luxury Accommodation',
    description: 'Experience refined hospitality on the shores of Lake Victoria. Luxury rooms, suites, dining, and bespoke experiences in Mwanza, Tanzania.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Mwanza Hotel - Lake Victoria Luxury',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mwanza Hotel — Lake Victoria Luxury Accommodation',
    description: 'Experience refined hospitality on the shores of Lake Victoria.',
    images: ['/og-default.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a18' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-body antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}