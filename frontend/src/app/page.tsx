import Link from 'next/link'
import {
  ArrowRight,
  Utensils,
  BedDouble,
  Compass,
  CalendarDays,
} from 'lucide-react'
import { getFeaturedBusinesses, getUpcomingEvents } from '@/lib/data'
import BusinessCard from '@/components/business-card'
import EventCard from '@/components/event-card'

const categoryCards = [
  {
    name: 'Restaurants & Cafes',
    icon: Utensils,
    color: 'from-orange-500 to-amber-500',
    href: '/businesses?category=Restaurants+%26+Cafes',
  },
  {
    name: 'Hotels & Lodges',
    icon: BedDouble,
    color: 'from-blue-500 to-cyan-500',
    href: '/businesses?category=Hotels+%26+Lodges',
  },
  {
    name: 'Tours & Activities',
    icon: Compass,
    color: 'from-emerald-500 to-teal-500',
    href: '/businesses?category=Tours+%26+Activities',
  },
]

export default async function Home() {
  const featured = await getFeaturedBusinesses()
  const upcoming = await getUpcomingEvents()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0E7C7B] via-[#0A5E5D] to-[#1B6FA8] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            Lake Victoria&apos;s Rock City
          </span>
          <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Discover{' '}
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              Mwanza
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/80">
            Find the best restaurants, hotels, tours, and upcoming events in
            Mwanza, Tanzania. Your complete city directory.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/businesses"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
            >
              Browse Businesses
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
            >
              <CalendarDays size={16} />
              View Events
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-text-primary">
          Browse by Category
        </h2>
        <div className="stagger-children grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categoryCards.map(({ name, icon: Icon, color, href }) => (
            <Link
              key={name}
              href={href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-md transition-transform group-hover:scale-110`}
              >
                <Icon size={22} color="#fff" />
              </div>
              <div>
                <h3 className="font-bold text-text-primary">{name}</h3>
                <p className="text-xs text-text-muted">Explore →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Featured <span className="text-primary">Businesses</span>
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Verified and popular spots in Mwanza
            </p>
          </div>
          <Link
            href="/businesses"
            className="hidden items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-dark sm:flex"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="stagger-children grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((biz) => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/businesses"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            View all businesses <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcoming.length > 0 && (
        <section className="border-t border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  Upcoming <span className="text-accent">Events</span>
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Don&apos;t miss what&apos;s happening in Mwanza
                </p>
              </div>
              <Link
                href="/events"
                className="hidden items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent-dark sm:flex"
              >
                All events <ArrowRight size={14} />
              </Link>
            </div>
            <div className="stagger-children flex flex-col gap-4">
              {upcoming.slice(0, 3).map((evt) => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link
                href="/events"
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent"
              >
                View all events <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
