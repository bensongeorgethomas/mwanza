'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { Business, Category } from '@/types'
import BusinessCard from '@/components/business-card'

const CATEGORIES: Category[] = [
  'Restaurants & Cafes',
  'Hotels & Lodges',
  'Tours & Activities',
]

interface BusinessesClientProps {
  businesses: Business[]
}

export default function BusinessesClient({
  businesses,
}: BusinessesClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialCategory = searchParams.get('category') || ''
  const initialSearch = searchParams.get('q') || ''

  const [search, setSearch] = useState(initialSearch)
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams()
    if (activeCategory) params.set('category', activeCategory)
    if (search) params.set('q', search)
    const qs = params.toString()
    router.replace(`/businesses${qs ? `?${qs}` : ''}`, { scroll: false })
  }, [activeCategory, search, router])

  const filtered = useMemo(() => {
    let result = businesses
    if (activeCategory) {
      result = result.filter((b) => b.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.address.toLowerCase().includes(q),
      )
    }
    return result
  }, [businesses, activeCategory, search])

  const clearFilters = () => {
    setSearch('')
    setActiveCategory('')
  }

  const hasFilters = activeCategory || search

  return (
    <div>
      {/* Search + Filters bar */}
      <div className="mb-8 flex flex-col gap-4">
        {/* Search input */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Search businesses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface-card py-3 pl-11 pr-4 text-sm text-text-primary shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            id="business-search"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-text-muted hover:bg-gray-100"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal size={15} className="text-text-muted" />
          <button
            onClick={() => setActiveCategory('')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              !activeCategory
                ? 'bg-primary text-white shadow-md'
                : 'border border-border bg-surface-card text-text-secondary hover:border-primary/30 hover:text-primary'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? '' : cat)
              }
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'border border-border bg-surface-card text-text-secondary hover:border-primary/30 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-xs font-semibold text-accent hover:text-accent-dark"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Search size={24} className="text-text-muted" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-text-primary">
            No businesses found
          </h3>
          <p className="mb-4 text-sm text-text-secondary">
            Try adjusting your search or filter criteria.
          </p>
          <button
            onClick={clearFilters}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-text-muted">
            {filtered.length} business{filtered.length !== 1 ? 'es' : ''} found
          </p>
          <div className="stagger-children grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((biz) => (
              <BusinessCard key={biz.id} business={biz} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
