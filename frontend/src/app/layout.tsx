import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Mwanza Directory — Discover Businesses & Events in Mwanza',
  description:
    'Your guide to the best restaurants, hotels, tours, and events in Mwanza, Tanzania. Discover local businesses on the shores of Lake Victoria.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} flex min-h-screen flex-col bg-surface text-text-primary`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
