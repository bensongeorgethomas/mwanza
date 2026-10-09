import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getAllBusinesses } from '@/lib/data'
import BusinessesClient from './businesses-client'

export const metadata: Metadata = {
  title: 'Businesses — Mwanza Directory',
  description:
    'Browse restaurants, hotels, lodges, tours and activities in Mwanza, Tanzania.',
}

export default async function BusinessesPage() {
  const businesses = await getAllBusinesses()

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-text-primary">
          Businesses
        </h1>
        <p className="mt-1 text-text-secondary">
          Discover what Mwanza has to offer
        </p>
      </div>

      <Suspense fallback={<div className="py-20 text-center text-text-muted">Loading...</div>}>
        <BusinessesClient businesses={businesses} />
      </Suspense>
    </section>
  )
}
