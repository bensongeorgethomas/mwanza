import type { Metadata } from 'next'
import { getUpcomingEvents, getPastEvents } from '@/lib/data'
import EventsClient from './events-client'

export const metadata: Metadata = {
  title: 'Events — Mwanza Directory',
  description:
    'Upcoming and past events in Mwanza, Tanzania. Festivals, marathons, cultural celebrations, and more.',
}

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ])

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-text-primary">Events</h1>
        <p className="mt-1 text-text-secondary">
          What&apos;s happening in Mwanza
        </p>
      </div>

      <EventsClient upcoming={upcoming} past={past} />
    </section>
  )
}
