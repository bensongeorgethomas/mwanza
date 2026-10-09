'use client'

import { useState } from 'react'
import type { Event } from '@/types'
import EventCard from '@/components/event-card'
import { CalendarDays, History } from 'lucide-react'

interface EventsClientProps {
  upcoming: Event[]
  past: Event[]
}

type Tab = 'upcoming' | 'past'

export default function EventsClient({ upcoming, past }: EventsClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming')

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    {
      key: 'upcoming',
      label: 'Upcoming',
      icon: <CalendarDays size={15} />,
      count: upcoming.length,
    },
    {
      key: 'past',
      label: 'Past',
      icon: <History size={15} />,
      count: past.length,
    },
  ]

  const events = activeTab === 'upcoming' ? upcoming : past

  return (
    <div>
      {/* Tabs */}
      <div className="mb-8 flex gap-2 border-b border-border">
        {tabs.map(({ key, label, icon, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              activeTab === key
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:text-text-secondary'
            }`}
          >
            {icon}
            {label}
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                activeTab === key
                  ? 'bg-primary/10 text-primary'
                  : 'bg-gray-100 text-text-muted'
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Events list */}
      {events.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <CalendarDays size={24} className="text-text-muted" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-text-primary">
            No {activeTab} events
          </h3>
          <p className="text-sm text-text-secondary">
            {activeTab === 'upcoming'
              ? 'Check back soon for new events in Mwanza!'
              : 'No past events to show yet.'}
          </p>
        </div>
      ) : (
        <div className="stagger-children flex flex-col gap-4">
          {events.map((evt) => (
            <EventCard
              key={evt.id}
              event={evt}
              isPast={activeTab === 'past'}
            />
          ))}
        </div>
      )}
    </div>
  )
}
