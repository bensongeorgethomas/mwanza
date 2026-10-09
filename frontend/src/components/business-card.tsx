import { BadgeCheck, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import type { Business } from '@/types'

interface BusinessCardProps {
  business: Business
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const { name, slug, description, category, address, opening_hours, is_verified, is_featured, images } = business

  // Category color map
  const categoryStyles: Record<string, string> = {
    'Restaurants & Cafes': 'bg-orange-100 text-orange-700',
    'Hotels & Lodges': 'bg-blue-100 text-blue-700',
    'Tours & Activities': 'bg-emerald-100 text-emerald-700',
  }

  return (
    <Link href={`/businesses/${slug}`} className="group block no-underline">
      <article className="overflow-hidden rounded-2xl border border-border bg-surface-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden sm:h-52">
          <img
            src={images[0]?.url}
            alt={images[0]?.alt || name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Featured badge */}
          {is_featured && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow">
              ★ Featured
            </span>
          )}
          {/* Category pill on image */}
          <span
            className={`absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
              categoryStyles[category] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-lg font-bold text-text-primary transition-colors group-hover:text-primary">
              {name}
            </h3>
            {is_verified && (
              <BadgeCheck size={18} className="shrink-0 text-primary" />
            )}
          </div>

          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {description}
          </p>

          <div className="flex flex-col gap-1.5 text-xs text-text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="shrink-0" />
              {address}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="shrink-0" />
              {opening_hours}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default BusinessCard
