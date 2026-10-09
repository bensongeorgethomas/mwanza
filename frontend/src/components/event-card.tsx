import { CalendarDays, MapPin } from 'lucide-react'
import type { Event } from '@/types'

interface EventCardProps {
  event: Event
  isPast?: boolean
}

const EventCard: React.FC<EventCardProps> = ({ event, isPast = false }) => {
  const { name, description, event_date, location, image_url, source_credit } =
    event

  const date = new Date(event_date)
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-border bg-surface-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isPast ? 'opacity-75 hover:opacity-100' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56">
          <img
            src={image_url}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {isPast && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-700">
                Past Event
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            <h3 className="mb-2 text-lg font-bold text-text-primary transition-colors group-hover:text-primary">
              {name}
            </h3>
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} className="shrink-0" />
              {formattedDate} · {formattedTime}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="shrink-0" />
              {location}
            </span>
            {source_credit && (
              <span className="ml-auto text-xs italic text-text-muted">
                via {source_credit}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default EventCard
